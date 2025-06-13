import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const BookModal = ({ isOpen, onClose, onSave, book }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      _id: "",
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      status: "Available",
    },
    shouldFocusError: true,
  });

  useEffect(() => {
    if (book) {
      reset({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        publishedYear: book.publishedYear || "",
        status: book.status || "Available",
      });
    } else {
       reset({
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      status: "Available",
    });
    }
  }, [book, reset]);

  const onSubmit = (data) => {
    const finalData = book ? { ...data, _id: book._id } : data;
    onSave(finalData);
    handleClose();
  };

  const handleClose = () => {
     reset({
      title: "",
      author: "",
      genre: "",
      publishedYear: "",
      status: "Available",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded p-6 w-full max-w-md shadow-md">
        <h2 className="text-lg font-medium mb-4">
          {book ? "Edit Book" : "Add Book"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full border rounded px-3 py-2"
            />
            {isSubmitted && errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              {...register("author", { required: "Author is required" })}
              className="w-full border rounded px-3 py-2"
            />
            {isSubmitted && errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Genre
            </label>
            <select
              {...register("genre", { required: "Genre is required" })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Genre</option>
              {[
                "Fiction",
                "Non-Fiction",
                "Mystery",
                "Romance",
                "Science Fiction",
                "Fantasy",
                "Dystopian",
                "Biography",
                "History",
              ].map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {isSubmitted && errors.genre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.genre.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Published Year
            </label>
            <input
              type="number"
              {...register("publishedYear", {
                required: "Year is required",
                min: { value: 1000, message: "Enter valid year" },
                max: {
                  value: new Date().getFullYear(),
                  message: `Year can't be in future`,
                },
              })}
              className="w-full border rounded px-3 py-2"
            />
            {isSubmitted && errors.publishedYear && (
              <p className="text-red-500 text-sm mt-1">
                {errors.publishedYear.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register("status", { required: "Status is required" })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
            {isSubmitted && errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {book ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
