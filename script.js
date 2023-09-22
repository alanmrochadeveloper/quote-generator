let quoteContainer = document.getElementById("quote-container");
let textContainer = document.getElementById("quote-text");
let quoteText = document.getElementById("quote");
let authorText = document.getElementById("author");
let twitterBtn = document.getElementById("twitter");
let newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];
function handleNewQuote() {
  const index = Math.floor(Math.random() * apiQuotes.length);

  const quote = apiQuotes[index];
  quoteText.textContent = quote.text;
  authorText.textContent = quote.author?.replace(", type.fit", "") ?? "Unknown";
  quote.text.length > 50 ? textContainer.classList.add("long-quote") : textContainer.classList.remove("long-quote");
}

async function getQuotes() {
  try {
    const apiUrl = "https://type.fit/api/quotes";
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    handleNewQuote();
  } catch (error) {
    alert(error);
    console.error(error);
  }
}

function buildTweeterUrl(text, author) {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${text.trim()} - ${author.trim()}`;
  return tweetUrl;
}

function tweetQuote(url) {
  window.open(url, "_blank");
}

const handleTwitterClick = () => tweetQuote(buildTweeterUrl(textContainer.textContent, authorText.textContent));

twitterBtn.addEventListener("click", handleTwitterClick);
newQuoteBtn.addEventListener("click", handleNewQuote);

getQuotes();
