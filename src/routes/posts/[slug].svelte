<script context="module">
  // import the logic for finding a post based on slug
  import { findPost } from "../../posts";

  // sapper calls this to load our data
  export function preload(page) {
    // find the post based on the slug param
    const post = findPost(page.params.slug);

    // return a list of props
    return { post };
  }
</script>

<script>
  // this prop is filled from the result of the `preload()`
  export let post;

  let prettyDate = post.date.toLocaleDateString("ru-RU");
</script>

<style>
  #title h1,
  #title h3,
  #title h6 {
    margin-bottom: 0;
    margin-top: 0;
  }
</style>

<svelte:head>
  <title>{post.title} | Mörkerfyr Reviews</title>
</svelte:head>

<!-- display the post -->
<div class="md:flex flex-col justify-center items-center">
  <article class="prose">
    <div id="title">
      <h1>{post.title}</h1>
      <h3>Опубликовано {prettyDate} за авторством {post.author}</h3>
      <h6>Теги: {post.tags}</h6>
    </div>
    {@html post.html}
  </article>
</div>
