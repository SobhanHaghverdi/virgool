enum CategoryMessage {
  NotFound = "دسته بندی یافت نشد",
  Created = "دسته بندی با موفقیت ایجاد شد.",
  Updated = "دسته بندی با موفقیت ویرایش شد.",
  DuplicateTitle = "عنوان دسته بندی از قبل وجود دارد.",
}

enum CategorySwaggerResponseMessage {
  Get = "Category details",
  NotFound = "Category not found",
  Filter = "Filtered list of categories",
  Created = "Category created successfully",
  Updated = "Category updated successfully",
  Deleted = "Category deleted successfully",
}

enum CategorySwaggerOperationMessage {
  Update = "Update category",
  Delete = "Delete category",
  Create = "Category creation",
  Filter = "Filter categories",
  GetById = "Get category details by id",
}

export {
  CategoryMessage,
  CategorySwaggerResponseMessage,
  CategorySwaggerOperationMessage,
};
