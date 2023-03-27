import { Configuration, OpenAIApi } from 'openai';

import { type IConfig } from '~/libs/packages/config/config.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type Footer,
  type Header,
  type Main,
  SectionType,
} from '~/packages/sections/sections.js';
import { type SiteCreateRequestDto } from '~/packages/sites/sites.js';

import { PROMPT_HEADING, PROMPT_REQUEST } from './libs/constants/constants.js';
import { PromptExample, PromptRequest } from './libs/enums/enums.js';

class OpenAI {
  private openAIApi: OpenAIApi;

  public constructor(config: IConfig) {
    this.openAIApi = new OpenAIApi(
      new Configuration({ apiKey: config.ENV.OPEN_AI.API_KEY }),
    );
  }

  private async createCompletion(
    type: ValueOf<typeof SectionType>,
    siteInfo: SiteCreateRequestDto,
  ): Promise<Record<string, string>> {
    const completionConfig = {
      model: 'text-davinci-003',
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    return await this.openAIApi
      .createCompletion({
        ...completionConfig,
        prompt: this.createPrompt(type, siteInfo),
      })
      .then((response) => response.data.choices[0]?.text as string)
      .then((text) => this.parseResponse(text));
  }

  public async generateSectionContent<T extends ValueOf<typeof SectionType>>(
    type: T,
    siteInfo: SiteCreateRequestDto,
  ): Promise<Header | Footer | Main> {
    switch (type) {
      case SectionType.HEADER: {
        return await this.generateHeaderContent(siteInfo);
      }
      case SectionType.MAIN: {
        return await this.generateMainContent(siteInfo);
      }
      case SectionType.FOOTER: {
        return await this.generateFooterContent(siteInfo);
      }
      default: {
        throw new Error('You should not be here');
      }
    }
  }

  private async generateHeaderContent(
    siteInfo: SiteCreateRequestDto,
  ): Promise<Header> {
    const data = (await this.createCompletion(
      SectionType.HEADER,
      siteInfo,
    )) as {
      logo: string;
      phone: string;
    };

    return {
      logo: data.logo,
      phone: data.phone,
    };
  }

  private async generateMainContent(
    siteInfo: SiteCreateRequestDto,
  ): Promise<Main> {
    const data = (await this.createCompletion(SectionType.MAIN, siteInfo)) as {
      title: string;
      description: string;
    };

    return { title: data.title, description: data.description, picture: '' };
  }

  private async generateFooterContent(
    siteInfo: SiteCreateRequestDto,
  ): Promise<Footer> {
    const data = (await this.createCompletion(
      SectionType.FOOTER,
      siteInfo,
    )) as {
      logo: string;
      description: string;
    };

    return {
      logo: data.logo,
      description: data.description,
      contacts: [],
      socials: [],
    };
  }

  private createPrompt(
    type: ValueOf<typeof SectionType>,
    siteInfo: SiteCreateRequestDto,
  ): string {
    const EXAMPLE_COMPANY_NAME = 'id Studio';
    const EXAMPLE_INDUSTRY = 'interior design';

    const exampleRequest = PROMPT_REQUEST.replace(
      '<name>',
      EXAMPLE_COMPANY_NAME,
    ).replace('<industry>', EXAMPLE_INDUSTRY);

    const request = PROMPT_REQUEST.replace('<name>', siteInfo.name).replace(
      '<industry>',
      siteInfo.industry,
    );

    const prompt = [
      PROMPT_HEADING,
      'Example:',
      exampleRequest,
      PromptRequest[type],
      PromptExample[type],
      request,
      PromptRequest[type],
    ];

    return prompt.join('\n');
  }

  private parseResponse(response: string): Record<string, string> {
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
