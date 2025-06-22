<script lang="ts">
  let url = $state("");
  let short = $state("");
  let error = $state("");
  let loading = $state(false);

  async function shorten() {
    short = "";
    error = "";
    loading = true;

    if (!url) {
      error = "Please enter a URL";
      loading = false;
      return;
    }

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        short = data.short;
      } else {
        error = data.error || "Unknown error";
      }

      loading = false;

    } catch (err) {
      error = "Request failed";
      loading = false;
    }
  }
</script>

<h1>URL Shortener</h1>
<input bind:value={url} placeholder="Paste your URL..." />
<button onclick={shorten}>Shorten</button>

{#if loading}
  <p>Loading...</p>
{/if}
{#if short}
  <p>Shortened URL: <a href={short} target="_blank">{short}</a></p>
{/if}
{#if error}
  <p style="color: red">Error: {error}</p>
{/if}
