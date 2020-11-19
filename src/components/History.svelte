<script>
    import { onMount } from 'svelte';
    import { nowplaying } from '../stores.js';

    // Init global value for now playing song.
    let song_current;
    let song_history = [];
    // https://svelte.dev/tutorial/writable-stores
    const unsubscribe = nowplaying.subscribe(value => {
        song_current = value;
    });

    // Do things only when DOM is rendered.
    onMount(() => {
        var url_stream = "https://morkerfyr.mle.party:8443/stream";
        var url_metadata = url_stream + "/metadata";
        var url_history = url_metadata + "-history";

        try {
            var eventSource = new EventSource(url_metadata);

            eventSource.onmessage = function(event) {
                var metadata = JSON.parse(event.data);
                song_current = metadata['metadata'];

                // Print now playing song.
                console.log("Now playing: " + song_current);
                // Change global state of now playing song.
                nowplaying.set(song_current);

                // Print history of played songs.
                try {
                    fetch(url_history)
                        .then(res => res.json())
                        .then((out) => {
                            song_history = out;
                            console.log('History: ', song_history);
                        });
                } catch (error) {
                    console.log("Can't get history of played songs! (JSON parsing is failed)");
                    console.log(error);
                }
            }
        } catch (error) {
            console.log("Can't get now playing song! (EventSource initializaion is failed)");
            console.log(error);
        }
    });
</script>

<style>

</style>

<div class="text-center">
    <div class="mx-auto">
        <h4 id="nowplaying" class="text-3xl">🎶 {$nowplaying} 🎶</h4>
    </div>

    <h4 class="text-3xl font-bold">История</h4>
    <ul id="history">
        {#each song_history.slice(1) as data}
            <li class="text-lg">{data.metadata.song}</li>
        {/each}
    </ul>
</div>