<script>
  import { SITE_URL } from "../../../morkerfyr.config";
  // import the list of posts
  import { posts } from "../../posts";

  const title = "Mörkerfyr Blog";
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="og:url" content="{SITE_URL}/posts/" />
  <meta property="og:image" content="{SITE_URL}/logo-512.png" />
  <meta
    property="og:description"
    content="Отвратительные рецензии на не менее отвратительную музыку." />
</svelte:head>

<div class="md:flex flex-col justify-center items-center">
  <article class="prose">
    <h1>
      Mörkerfyr Blog<span class="pl-4 opacity-50"><a
          href="/posts/rss">[RSS]</a></span>
    </h1>
    <ul>
      <!-- iterate through each post -->
      {#each posts as post}
        <!-- link article to /posts/$slug -->
        <li>
          <a href={`/posts/${post.slug}`}>{post.title}</a><span
            class="pl-4 opacity-50">[{post.tags.join(', ')}]</span>
        </li>
      {/each}
    </ul>
  </article>
</div>
