<script>
  import { radio_streamers, radio_social } from "../../morkerfyr.config";
</script>

<style>
</style>

<footer class="md:flex pt-5">
  <!-- Streamers -->
  <div class="flex-1">
    <div
      class="flex flex-col justify-center items-center md:text-left text-center">
      <h4 class="text-3xl font-bold">Ведущие</h4>
      <ul>
        {#each radio_streamers as data}
          <li><a href={data.link}>{data.name}</a></li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Social -->
  <div class="flex-1">
    <div
      class="flex flex-col justify-center items-center md:text-left text-center">
      <h4 class="text-3xl font-bold">Контакты</h4>
      <ul>
        {#each radio_social as data}
          <li><a href={data.link}>{data.name}</a></li>
        {/each}
      </ul>
    </div>
  </div>
</footer>
