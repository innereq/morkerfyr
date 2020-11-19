<script>
  // import the list of posts
  import {posts} from '../../posts'
</script>

<svelte:head>
	<title>Mörkerfyr Reviews</title>
</svelte:head>

<div class="md:flex flex-col justify-center items-center">
  <article class="prose">
    <h1>Mörkerfyr Reviews</h1>
    <ul>
      <!-- iterate through each post -->
      {#each posts as post}
        <!-- link article to /posts/$slug -->   
        <li><a href={`/posts/${post.slug}`}>{post.title}</a></li>
      {/each}
    </ul>
  </article>
</div>