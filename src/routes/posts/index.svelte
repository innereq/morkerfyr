<script>
  // import the list of posts
  import { posts } from "../../posts";
</script>

<svelte:head>
  <title>Mörkerfyr Reviews</title>
</svelte:head>

<div class="md:flex flex-col justify-center items-center">
  <article class="prose">
    <h1>
      Mörkerfyr Reviews<span class="pl-4 opacity-50"><a
          href="/posts/rss">[RSS]</a></span>
    </h1>
    <ul>
      <!-- iterate through each post -->
      {#each posts as post}
        <!-- link article to /posts/$slug -->
        <li>
          <a href={`/posts/${post.slug}`}>{post.title}</a><span
            class="pl-4 opacity-50">[{post.tags}]</span>
        </li>
      {/each}
    </ul>
  </article>
</div>
