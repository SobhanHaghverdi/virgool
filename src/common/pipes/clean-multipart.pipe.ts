import {
  Injectable,
  PipeTransform,
  type ArgumentMetadata,
} from "@nestjs/common";

@Injectable()
class CleanMultipartPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === "body" && value && typeof value === "object") {
      return this.cleanMultipartData(value);
    }

    return value;
  }

  private cleanMultipartData(obj: any): any {
    const cleaned: any = {};

    Object.keys(obj).forEach((key) => {
      let value = obj[key];

      if (typeof value === "string") {
        value = value.trim();
        if (value !== "") cleaned[key] = value;
      } //* Convert string to numbers (if is number in shape of string)
      else if (!isNaN(value) && value !== "") {
        cleaned[key] = Number(value);
      } //* Convert to real boolean
      else if (value === "true" || value === "false") {
        cleaned[key] = value === "true";
      } else if (value !== null && value !== undefined) {
        cleaned[key] = value;
      }
    });

    return cleaned;
  }
}

export default CleanMultipartPipe;
