// src/services/bookServices.js

const API_BASE_URL = "https://crudcrud.com/api/58f13656629841f08a972b777e2118e6/books";

export const bookServices = {
  getBooks: async () => {
    const res = await fetch(API_BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch books");
    const data = await res.json();
    return data.map((item) => ({
      id: item._id,
      title: item.title,
      author: item.author,
      genre: item.genre,
      publishedYear: item.publishedYear,
      status: item.status,
    }));
  },

  createBook: async (book) => {
    // Basic validation before sending request
    if (!book.title || !book.author || !book.genre || !book.publishedYear || !book.status) {
      throw new Error("Missing required fields");
    }
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error("Failed to create book");
    return await res.json();
  },

  updateBook: async (id, book) => {
    // Basic validation before sending request
    if (!book.title || !book.author || !book.genre || !book.publishedYear || !book.status) {
      throw new Error("Missing required fields");
    }
    const { id: _id, ...rest } = book;
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    });
    if (!res.ok) throw new Error("Failed to update book");
    return true;
  },

  deleteBook: async (id) => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete book");
    return true;
  },
};
