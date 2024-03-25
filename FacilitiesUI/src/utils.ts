let BASE_URL = ""

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    BASE_URL = "http://localhost:3080";
} else {
    BASE_URL = window.location.origin; 
}

export {BASE_URL}
