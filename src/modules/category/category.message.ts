enum CategoryMessage {
  Created = "دسته بندی با موفقیت ایجاد شد.",
  DuplicateTitle = "عنوان دسته بندی از قبل وجود دارد.",
}

enum CategorySwaggerResponseMessage {
  Filter = "Filtered list of categories",
  Created = "Category created successfully",
}

enum CategorySwaggerOperationMessage {
  Create = "Category creation",
  Filter = "Filter categories",
}

export {
  CategoryMessage,
  CategorySwaggerResponseMessage,
  CategorySwaggerOperationMessage,
};
