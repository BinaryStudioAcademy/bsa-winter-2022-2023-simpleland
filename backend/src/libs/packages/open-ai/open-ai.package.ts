import { type CreateCompletionRequest, Configuration, OpenAIApi } from 'openai';

import { type IConfig } from '~/libs/packages/config/config.js';
import { type ValueOf } from '~/libs/types/types.js';

import { ImageSize } from './libs/enums/enums.js';
import { imageSizeToResolutionMap } from './libs/maps/maps.js';

type Constructor = {
  config: IConfig;
};

class OpenAI {
  private openAIApi: OpenAIApi;

  private completionConfig: Omit<CreateCompletionRequest, 'prompt'>;

  public constructor({ config }: Constructor) {
    this.openAIApi = new OpenAIApi(
      new Configuration({ apiKey: config.ENV.OPEN_AI.API_KEY }),
    );

    this.completionConfig = {
      model: 'text-davinci-003',
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
  }

  public async createCompletion(
    prompt: string,
  ): Promise<Record<string, string>> {
    const {
      data: { choices },
    } = await this.openAIApi.createCompletion({
      ...this.completionConfig,
      prompt,
    });

    const text = choices[0]?.text ?? '';

    return this.parseCompletionResponse(text);
  }

  public async createImage(
    prompt: string,
    size: ValueOf<typeof ImageSize> = ImageSize.SMALL,
  ): Promise<string> {
    const { data } = await this.openAIApi.createImage({
      prompt,
      size: imageSizeToResolutionMap[size],
      response_format: 'b64_json',
    });

    const [image] = data.data;

    return image?.b64_json ?? '';
  }

  private parseCompletionResponse(response: string): Record<string, string> {
    const result: Record<string, string> = {};
    const lines = response.split('\n').filter(Boolean);
    for (const line of lines) {
      const [key, value] = line.split(': ');

      if (key && value) {
        result[key] = value;
      }
    }

    return result;
  }
}

export { OpenAI };
