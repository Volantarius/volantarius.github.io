# Portfolio

Hello! This is a highlight of the various projects and interests I have over the years.

# Hammer

I have used Source's Hammer Editor since 2007. Self taught and always been open to criticism and self improving. Most of my finished work are recreations of maps from other games.

## 2012

This is a recreation of a map called Hometown. I was trying out other lighting methods and created a cloudy skybox.

![Hometown](hometown_recreated.jpg)

## 2017

I started to use a tool called GE Edit, that would allow you to extract textures, sounds, and models from Goldeneye.

![complex](complex_s1.jpg)

Complex was one were I actually had the model of the level imported in the Source engine. Then in the editor I could use the model as a guide to create the brushs as close as possible to the original level.

![complex](complex_detail.jpg)

Details mattered to me a lot and I had to make sure everything was the way it should.

![complex](coldwinter3.jpg)

This level is from ColdWinter (PS2). At this point I wanted to see if I could do something different, and try to make levels from other games. I used a tool that can extract textures from ps2 emulation and recreated the level by hand with no guide. It's a fairly simple level to recreate.

![complex](coldwinter2.jpg)

## 2018

Once I found this tool I got various ideas for other levels to make.

![complex](thug1.jpg)

This is a specific recreation of a pre-made park in Tony Hawk's Underground, called SP's Ville. All of the geometry was remade in Hammer. No model imports.

![complex](thug_water.jpg)

Again all the details mattered. The water here sways, uses cubemaps and normals to make it look a lot nicer, while staying true to the game.

![complex](thug_detail.jpg)

The textures when extracted had masks for reflections, these were also taken into account.

# Coding

Around when I finished and published my Tony Hawk map I got more interested in hacking game files themselves. My first real hack project was Timesplitters 1.

![Source 2](ts1_problems.jpg)

I started to use Godot as a tool rather than make a game with. This was a great idea, since I was able to work much quicker and verify what I was doing. The screenshot was when I just got the meshs to slightly work. They had to have the culling disabled so that you can see a fully flat wall. Also this is not at all how the level would have been rendered. The lighting is way off and is being applied to the albedo instead of being treated as if it were light.

![Source 2](ts1_new01.jpg)

But I worked hard and figured out all of the issues! Using a custom shader to use the vertex coloring as an emission output, other light sources in the engine can be used.

![Source 2](ts1_chemicalplant.jpg)

The green is the collision meshs loaded up. Also to be noted; none of the secondary meshs are loaded right now. I'm still working on those.

# Other Projects

Inbetween projects I like to learn other tools and try out new things.

![Source 2](complex1.jpg)

This is Half Life: Alyx. I've gotten to know Complex so well I can recite each vertex position. I remade the level and wanted to make new and modern textures for it. A friend of mine showed my how to use Blender.

![Source 2](complex2.jpg)

Using Blender is great for creating textures. I recreated the walls individually and used Blenders bake normal map. Using this can make topologically correct normal maps, instead of a heightmap filter on any converter program. Blender can also create the ambient occlusion textures, metal textures, and roughness.

![Source 2](complex3.jpg)

# Misc

Hammer maps are compatable with older Hammer versions. This is the same Source Complex map in Half Life 1 Deathmatch

![Source 2](complex_hl1.jpg)
![Source 2](complex_hl1detail.jpg)

More Timesplitters 1 screenshots.

![Source 2](ts1_chinese.jpg)
![Source 2](ts1_compound.jpg)
![Source 2](ts1_docks.jpg)
![Source 2](ts1_village.jpg)