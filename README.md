<h1>React2D - A 2D canvas engine</h1>
<i>
    2D Canvas engine, simple GUI generation, tileset & tilemap loading
</i>

<h2>Credits: </h2>
- Spritesheet: <a href="https://pipoya.itch.io/pipoya-rpg-tileset-32x32">pipoya-rpg-tileset-32x32</a>

<h3>Update Log:</h3> 
<strong>V0.1.4a:</strong> 
<pre>
    - Async update queue added for asset fetching to update loop.
    - Support for multiple tile trigger events added. 
    - Tilemap editor made (source not added yet, still needs some bug fixing)
</pre>

<strong>V0.1.3a:</strong> 
<pre>
    - GUI system base added
    - UIBox component added to GUI.
    - UITextbox component  added to GUI
    - UIHorzontalMenu component added to GUI 
</pre>

<strong>V0.1.2a:</strong> 
<pre>
    - Action handler base added (needs optimization & abstractation, no interface implementation in node, gotta look into this)
    - Map clipping changed, needs optimization 
    - Teleport event added to action handler
</pre>

<strong>V0.1.1a:</strong> 
<pre>
    - Tilemap render loop optimized.
    - Tile accessibility check expanded. 
    - text -> csv parsing seperated to function.
    - spritesheet static fetch function added to remove the need to load/parse image yourself.
</pre>

<strong>V0.1a:</strong> 
<pre>
    - Main canvas rendering components created and changed to frame based updates.
    - InputHandler base added
    - Spritesheet class added for more generalized sprite handeling
    - Player and tilemap entities added.
    - CSV loading added for background/overlay of tilemap
    - JSON loading added for interactable objects of tilemap
</pre>
