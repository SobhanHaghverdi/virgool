import type { MessageStructure } from "src/common/types/api-endpoint.type";

enum CategoryMessage {
  NotFound = "دسته بندی یافت نشد",
  Created = "دسته بندی با موفقیت ایجاد شد.",
  Updated = "دسته بندی با موفقیت ویرایش شد.",
  DuplicateTitle = "عنوان دسته بندی از قبل وجود دارد.",
}

type CategoryMessageKey = "GetById" | "Filter" | "Create" | "Update" | "Delete";

const CategorySwaggerMessage: Record<CategoryMessageKey, MessageStructure> = {
  GetById: {
    summary: "Get category details by id",
    responses: { success: "Category details" },
  },
  Filter: {
    summary: "Filter categories",
    responses: { success: "Filtered list of categories" },
  },
  Create: {
    summary: "Create category",
    responses: {
      conflict: "Duplicate title",
      created: "Category created successfully",
    },
  },
  Update: {
    summary: "Update category",
    responses: {
      conflict: "Duplicate title",
      notFound: "Category not found",
      success: "Category updated successfully",
    },
  },
  Delete: {
    summary: "Delete category",
    responses: {
      notFound: "Category not found",
      noContent: "Category deleted successfully",
    },
  },
};

export { CategoryMessage, CategorySwaggerMessage };
