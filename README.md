<h1>React2D - A 2D canvas engine</h1>
<i>
    2D Canvas engine, simple GUI generation, tileset & tilemap loading
</i>

<h2>Credits: </h2>
- Spritesheet: <a href="https://pipoya.itch.io/pipoya-rpg-tileset-32x32">pipoya-rpg-tileset-32x32</a>

<h3>Update Log:</h3> 
<strong>V0.1.3a:</strong> 
<pre>
    - GUI system base added
    - GUIDrawer added for context drawing support
    - UIBox component added added to GUI
    - UITextbox component added  added to GUI
    - HorzontalMenu components added to GUI 
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
