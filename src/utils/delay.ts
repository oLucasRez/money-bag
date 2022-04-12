// ============================================================================
export const delay = async (ms: number) => {
  const response = await new Promise((res) =>
    setTimeout((args: any) => {
      return res(args);
    }, ms)
  );
  return response;
};
