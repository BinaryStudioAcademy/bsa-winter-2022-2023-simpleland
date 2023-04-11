type SiteFeedbackUpdateContentDto = {
  title: string;
  cards: {
    photo: string;
    name: string;
    profession: string;
    feedback: string;
  }[];
};

export { type SiteFeedbackUpdateContentDto };
