<script>
    let streamers = [
        { name: "Fuerlee", link: "https://t.me/fuerlee"},
        { name: "Coma Grayce", link: "https://sunbutt.faith/Участница:Commagray"}
    ];

    let social = [
        { name: "Telegram", link: "https://t.me/morkerfyr"},
        { name: "GitHub", link: "https://github.com/innereq/morkerfyr"}
    ];
</script>

<style>

</style>

<footer class="md:flex">
    <!-- Streamers -->
    <div class="flex-1 text-center">
        <h4 class="text-3xl font-bold">Ведущие</h4>
        <ul>
            {#each streamers as data}
                <li><a href="{data.link}">{data.name}</a></li>
            {/each}
        </ul>
    </div>

    <!-- Social -->
    <div class="flex-1 text-center">
        <h4 class="text-3xl font-bold">Контакты</h4>
        <ul>
            {#each social as data}
                <li><a href="{data.link}">{data.name}</a></li>
            {/each}
        </ul>
    </div>
</footer>