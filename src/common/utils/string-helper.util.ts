class StringHelper {
  static createSlug(content: string | undefined): string | undefined {
    if (content === undefined) return undefined;

    return content
      .replace(/[،ًًًٌٍُِ\.\+\-_)(*&^%$#@!~'";:?><«»`ء]+/g, "")
      ?.replace(/[\s]+/g, "-")
      .toLowerCase();
  }
}

export default StringHelper;
