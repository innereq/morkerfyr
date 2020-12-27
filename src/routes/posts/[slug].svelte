<script context="module">
  // import the logic for finding a post based on slug
  import { findPostBySlug } from "../../posts";

  // sapper calls this to load our data
  export function preload(page) {
    // find the post based on the slug param
    const post = findPostBySlug(page.params.slug);

    // return a list of props
    return { post };
  }
</script>

<script>
  import { SITE_URL } from "../../../morkerfyr.config";

  const title = "Mörkerfyr Blog";

  // this prop is filled from the result of the `preload()`
  export let post;
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
  <title>{post.title} | {title}</title>
  <meta property="og:title" content="{post.title} | {title}" />
  <meta property="og:url" content="{SITE_URL}/posts/{post.slug}/" />
  <meta property="og:image" content="{SITE_URL}/logo-512.png" />
  <meta
    property="og:description"
    content="Рецензия на альбом «{post.title}». Теги: {post.tags.join(', ')}." />
</svelte:head>

<!-- display the post -->
<div class="md:flex flex-col justify-center items-center">
  <article class="prose">
    <div id="title">
      <h1>{post.title}</h1>
      <h3>
        Опубликовано
        {post.date.toLocaleDateString('ru-RU')}
        за авторством
        {post.author}
      </h3>
      <h6>Теги: {post.tags.join(', ')}</h6>
    </div>
    {@html post.html}
  </article>
</div>
