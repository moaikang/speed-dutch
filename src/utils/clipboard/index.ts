export const copyToClipboard = async (text: string) => {
  await window.navigator.clipboard.writeText(text);
};

export const openShareBottomSheet = async ({ title, text, url }: ShareData) => {
  await navigator.share({
    title,
    text,
    url,
  });
};
