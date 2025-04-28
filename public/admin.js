async function fetchBlogs() {
  const res = await fetch("/api/blogs", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  const blogs = await res.json();
  loadBlogs(blogs);
}

document
  .getElementById("createPostForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
      }),
    });
    if (res.ok) {
      fetchBlogs();
    } else {
      alert("Error creating post");
    }
  });

async function deletePost(id, event) {
  event.stopPropagation();
  
  // Confirm if admin wants to delete this for sure.
  const confirmation = confirm("Are you sure you want to delete this blog post?");
  if (!confirmation) {
    return; 
  }

  const res = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  if (res.ok) {
    fetchBlogs();
  } else {
    alert("Error deleting post");
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// Load blogs
function loadBlogs(blogs) {
  const container = document.getElementById("blogs-container");
  container.innerHTML = "";
  blogs.forEach((blog) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    blogCard.innerHTML = `
<h3>${blog.title}</h3>
<p>${truncateContent(blog.content, 200)}</p> 
<button class="delete-blog" onclick="deletePost(${blog.id}, event)">Delete</button>
`;
    blogCard.addEventListener("click", () => openPopup(blog));
    container.appendChild(blogCard);
  });
}

// Truncate content and add elipsis to the post content
function truncateContent(content, maxLength) {
  if (content.length <= maxLength) {
    return content;
  }
  return content.substring(0, maxLength) + "...";
}

// Open popup
function openPopup(blog) {
  document.getElementById("popup-title").innerText = blog.title;
  document.getElementById("popup-body").innerText = blog.content;
  document.getElementById("popup").style.display = "flex";
}

// Close popup
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

document.addEventListener("DOMContentLoaded", async () => {
  await verifyUserUsingToken(); // Check if user is admin, when page loads
});

async function verifyUserUsingToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Unauthorized access. Please login first.");
    window.location.href = "login";
    return;
  }

  try {
    const res = await fetch("/api/auth/verify", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      throw new Error("Invalid token");
    }

    const data = await res.json();

    if (data.role !== "admin") {
      alert("Access denied. Admins only!");
      window.location.href = "blogs"; // Redirect to blogs page
    }
    await fetchBlogs();
  } catch (error) {
    console.error(error);
    alert("Session expired or invalid. Please login again.");
    localStorage.removeItem("token");
    window.location.href = "login";
  }
}
