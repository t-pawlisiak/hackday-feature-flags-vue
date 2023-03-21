import * as configcat from 'configcat-js'
import * as LDClient from 'launchdarkly-js-client-sdk'
import Optimizely from '@optimizely/optimizely-sdk'

import type { Client } from '@optimizely/optimizely-sdk'
import { defineStore } from 'pinia'
import type { State } from './featureFlags.d'

const user: { id: number; name: string } = {
  id: 1234,
  name: 'Test Test'
}

export const useFeatureFlagsStore = defineStore('featureFlagsStore', {
  state: (): State => ({
    configCat: [],
    launchDarkly: [],
    optimizely: []
  }),

  actions: {
    fetchConfigCatFlags() {
      const configCatClient = configcat.getClient(import.meta.env.VITE_CONFIGCAT_SDK_KEY)

      const userObject = new configcat.User(
        `client_${user.id}`,
        undefined, // email
        undefined, // country

        // custom:
        {
          Environment: import.meta.env.VITE_ENVIRONMENT
        }
      )

      configCatClient.getValueAsync('boolean_flag', false, userObject).then((value) => {
        this.configCat = {
          ...this.configCat,
          boolean_flag: value
        }
      })

      configCatClient.getValueAsync('number_setting', 3, userObject).then((value) => {
        this.configCat = {
          ...this.configCat,
          number_setting: value
        }
      })

      configCatClient.getValueAsync('text_setting', 'Foobar', userObject).then((value) => {
        this.configCat = {
          ...this.configCat,
          text_setting: value
        }
      })
    },

    fetchLaunchDarklyFlags() {
      const context: LDClient.LDContext = {
        kind: 'multi',
        user: {
          key: `client_${user.id}`,
          name: user.name
        },
        environment: {
          key: import.meta.env.VITE_ENVIRONMENT,
          name: import.meta.env.VITE_ENVIRONMENT
        }
      }

      const client = LDClient.initialize(import.meta.env.VITE_LAUNCH_DARKLY_CLIENT_ID, context)

      client.on('ready', () => {
        this.launchDarkly = client.allFlags()
      })
    },

    fetchOptimizelyFlags() {
      const optimizelyClient: Client | null = Optimizely.createInstance({
        sdkKey: import.meta.env.VITE_OPTIMIZELY_SDK_KEY
      })

      const client = `client_${user.id}`

      const attributes = {
        environment: import.meta.env.VITE_ENVIRONMENT
      }

      optimizelyClient?.onReady().then(() => {
        this.optimizely = {
          'boolean-flag': {
            enabled: optimizelyClient.isFeatureEnabled('boolean-flag', client, attributes),
            variationKey: optimizelyClient.getFeatureVariableInteger(
              'boolean-flag',
              'value',
              client,
              attributes
            )
          },
          'string-flag': {
            enabled: optimizelyClient.isFeatureEnabled('string-flag', client, attributes),
            variationKey: optimizelyClient.getFeatureVariableInteger(
              'string-flag',
              'value',
              client,
              attributes
            )
          },
          'number-flag': {
            enabled: optimizelyClient.isFeatureEnabled('number-flag', client, attributes),
            variationKey: optimizelyClient.getFeatureVariableInteger(
              'number-flag',
              'value',
              client,
              attributes
            )
          },
          'json-flag': {
            enabled: optimizelyClient.isFeatureEnabled('json-flag', client, attributes),
            variationKey: optimizelyClient.getFeatureVariableInteger(
              'json-flag',
              'value',
              client,
              attributes
            )
          }
        }
      })
    }
  }
})
