<script>
    import { onMount, onDestroy } from 'svelte';
    import { nowplaying } from '../stores.js';
    import Plyr from 'plyr';

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

        // Audio player.
        const controls = `
            <div class="plyr__controls">
                <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
                    <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
                    <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
                </button>
                <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
                    <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
                    <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
                </button>
                <div class="plyr__volume">
                    <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
                </div>
                </button>
            </div>
            `;
        const player = new Plyr('#player', {
            title: "test",
            controls,
        });

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
    <div class="mx-auto w-1/2">
        <h4 id="nowplaying" class="text-3xl">🎶 {$nowplaying} 🎶</h4>
        <!-- svelte-ignore a11y-media-has-caption -->
        <audio id="player" controls="controls" preload="none">
            <source src="http://127.0.0.1:8000/example" type="audio/mpeg">
        </audio>
    </div>

    <h4 class="text-3xl ">История</h4>
    <ul id="history">
        {#each song_history as data}
            <li class="text-lg">{data.metadata.song}</li>
        {/each}
    </ul>
</div>