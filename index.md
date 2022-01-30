# Portfolio

[TEST]{% post_url 2020-12-06-firstpost %}
[Blood Box]{% post_url arma/bloodbox/2020-12-06-bloodbox %}

Hello! A lot of my projects are revolved around recreating maps from other games. Recently I've been creating textures in Blender and learning to model. I code as a hobby, fiddling around with engines like Unity and Godot.

<volantarius@gmail.com>

# Hammer

I have used Source's Hammer Editor since 2007. This is the program that has gotten me so interested in how games are made. Here's some of my history of what I ended up doing in Hammer.

## 2017

I started to use a tool called GE Edit, that would allow you to extract textures, sounds, and models from Goldeneye.

![complex](complex_s1.jpg)

Complex was one were I actually had the model of the level imported in the Source engine. Then in the editor I could use the model as a guide to create the brushs as close as possible to the original level.

![Paper thin geometry](complex_detail.jpg)

Details mattered to me a lot and I had to make sure everything was the way it should.

![Sterling's Winter](coldwinter3.jpg)

This level is from ColdWinter (PS2). At this point I wanted to see if I could do something different, and try to make levels from other games. I used a tool that can extract textures from ps2 emulation and recreated the level by hand with no guide. It's a fairly simple level to recreate.

![Sterling's Winter](coldwinter2.jpg)

## 2018

Once I found this tool I got various ideas for other levels to make.

![SP's Ville](thug1.jpg)

This is a specific recreation of a pre-made park in Tony Hawk's Underground, called SP's Ville. All of the geometry was remade in Hammer. No model imports.

![Should have made an animation](thug_water.jpg)

Again all the details mattered. The water here sways, uses cubemaps and normals to make it look a lot nicer, while staying true to the game.

![Windows have reflections!](thug_detail.jpg)

The textures when extracted had masks for reflections, these were also taken into account.

# Coding

Around when I finished and published my Tony Hawk map I got more interested in hacking game files themselves. My first real hack project was Timesplitters 1.

![A lot of issues](ts1_problems.jpg)

I started to use Godot as a tool rather than make a game with. This was a great idea, since I was able to work much quicker and verify what I was doing. The screenshot was when I just got the meshs to slightly work. They had to have the culling disabled so that you can see a fully flat wall. Also this is not at all how the level would have been rendered. The lighting is way off and is being applied to the albedo instead of being treated as if it were light.

![Much better](ts1_chinesebetter.jpg)

Eventually I figured out all of the issues!

![Graveyard!](ts1_new01.jpg)

I wrote a shader to fix the lighting using emission for the vertex colors. This meant the engine's lights can cast correctly to the level.

![Sort of like Goldeneye's collision](ts1_chemicalplant.jpg)

The green is the collision meshs loaded up. Also to be noted; none of the secondary meshs are loaded right now. I'm still working on those.

# Other Projects

Inbetween projects I like to learn other tools and try out new things.

![Source 2](complex1.jpg)

This is Half Life: Alyx. I've gotten to know Complex so well I can recite each vertex position. I remade the level and wanted to make new and modern textures for it. A friend of mine showed my how to use Blender.

![Source 2](complex2.jpg)

Using Blender is great for creating textures. I recreated the walls individually and used Blender's bake normal map. Using this can make topologically correct normal maps, instead of a heightmap filter on any converter program. Blender can also create the ambient occlusion textures, metal textures, and roughness.

![Source 2](complex3.jpg)

Also to note, people always has seen the black and white stripes as just stripes. I interpreted them as shadows on the bends on the metal.

# Misc

More Timesplitters 1 screenshots.

![Chinese](ts1_chinese.jpg)
![Compound](ts1_compound.jpg)
![Docks](ts1_docks.jpg)
![Village](ts1_village.jpg)

Hammer maps are compatable with older Hammer versions. This is the same Source Complex map in Half Life 1 Deathmatch.

![Gldsrc](complex_hl1.jpg)
![Gldsrc](complex_hl1detail.jpg)

Other Hammer projects.

![Hometown](hometown_recreated.jpg)