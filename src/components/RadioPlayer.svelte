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
        var url_stream = "http://127.0.0.1:8000/example";
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

<p>Сейчас играет: {$nowplaying}</p>

<!-- svelte-ignore a11y-media-has-caption -->
<audio controls="controls" preload="none">
    <source src="http://127.0.0.1:8000/example" type="audio/mpeg">
</audio>

<ul>
    {#each song_history as data}
        <li>{data.metadata.song}</li>
    {/each}
</ul>