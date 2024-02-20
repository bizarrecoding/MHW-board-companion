import React, { useCallback, useEffect, useRef } from "react";

type Diff = {
  [key: string]: {
    before: any;
    after: any;
  };
};

// type DependencyListType = React.DependencyList;
type DependencyListType = any[];

const reduceChanges = (
  current: Diff,
  dependency: any,
  index: number,
  previousDeps: DependencyListType,
  dependencyNames: string[]
) => {
  if (dependency !== previousDeps[index]) {
    const keyName = dependencyNames[index] || index;
    return {
      ...current,
      [keyName]: {
        before: previousDeps[index],
        after: dependency,
      },
    };
  }

  return current;
};

export const useCallbackDebugger = (
  callback: any,
  dependencies: DependencyListType,
  dependencyNames: string[] = []
) => {
  const previousDeps = usePrevious(dependencies, []);
  const changedDeps = dependencies.reduce(
    (current, dependency, index) => {
      return reduceChanges(current, dependency, index, previousDeps, dependencyNames);
    },
    {} as Record<string, Diff>
  );

  if (Object.keys(changedDeps).length) {
    for (const key in changedDeps) {
      if (Object.hasOwnProperty.call(changedDeps, key)) {
        const element = changedDeps[key];
        console.log(
          `🔴 ~ useCallbackDebugger ~ change ${key}`,
          element?.before,
          `->`,
          element?.after
        );
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, dependencies);
};

/**
 * used to debug which dependency is changing and how often it is doing so
 * @param effect: effect function that must return a boolean or effect cleanup function
 * @param dependencies
 * @param dependencyNames
 */

export const useEffectDebugger = (
  effect: () => boolean | React.EffectCallback,
  dependencies: DependencyListType,
  dependencyNames: string[] = [],
  fullDetails = true
) => {
  const previousDeps = usePrevious(dependencies, []);
  const changedDeps = dependencies.reduce(
    (current, dependency, index) => {
      return reduceChanges(current, dependency, index, previousDeps, dependencyNames);
    },
    {} as Record<string, Diff>
  );
  if (fullDetails) {
    if (Object.keys(changedDeps).length) {
      for (const key in changedDeps) {
        if (Object.hasOwnProperty.call(changedDeps, key)) {
          const element = changedDeps[key];
          console.log(
            `⚠️ ~ useEffectDebugger ~ change ${key}`,
            element?.before,
            `->`,
            element?.after
          );
        }
      }
    }
  } else if (Object.keys(changedDeps).length) {
    console.log(`⚠️ ~ useEffectDebugger ~ changedDeps`, Object.keys(changedDeps));
  }

  useEffect(() => {
    const cleanUpResults: boolean | any = effect();
    if (typeof cleanUpResults === `function`) {
      console.log(`✅ ~ useEffectDebugger: executed effect`);
      return cleanUpResults;
    }
    if (cleanUpResults) console.log(`✅ ~ useEffectDebugger: executed effect`);
    else console.log(`🔴 ~ useEffectDebugger: skipped effect`);
    return () => {
      //
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

function usePrevious<T>(value: T, initialValue: T): T {
  const ref = useRef<typeof initialValue>(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
