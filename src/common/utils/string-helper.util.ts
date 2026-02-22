class StringHelper {
  static createSlug(content: string): string {
    return content
      .replace(/[،ًًًٌٍُِ\.\+\-_)(*&^%$#@!~'";:?><«»`ء]+/g, "")
      ?.replace(/[\s]+/g, "-");
  }
}

export default StringHelper;
