type FeatureFlags = Record<string, string | number | boolean>;

export interface State {
    configCat: FeatureFlags | []
    launchDarkly: FeatureFlags | []
    optimizely: {
        [key as string]: {
            enabled: boolean;
            variationKey?: string | number | boolean;
        }
    }
    statsig: FeatureFlags | []
}