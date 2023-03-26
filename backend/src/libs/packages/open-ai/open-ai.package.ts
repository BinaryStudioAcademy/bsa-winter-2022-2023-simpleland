import { Configuration, OpenAIApi } from 'openai';

import { type IConfig } from '~/libs/packages/config/config.js';

class OpenAI {
  private openAIApi: OpenAIApi;

  public constructor(config: IConfig) {
    this.openAIApi = new OpenAIApi(
      new Configuration({ apiKey: config.ENV.OPEN_AI.API_KEY }),
    );
  }
}

export { OpenAI };
