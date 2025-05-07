document.getElementById("to-community").addEventListener("click", () => {
    document.getElementById("status-view").classList.add("hidden");
    document.getElementById("community-view").classList.remove("hidden");
});

document.getElementById("to-status").addEventListener("click", () => {
    document.getElementById("community-view").classList.add("hidden");
    document.getElementById("status-view").classList.remove("hidden");
});
