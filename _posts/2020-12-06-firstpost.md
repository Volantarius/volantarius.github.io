---
layout: post
title: "Welcome!"
---

# Welcome

**Hello worlds**, asodjiasd.

{% highlight sqf %}
if ( _checkPos isFlatEmpty [-1, -1, 0.7, 5, 0, false] isEqualTo [] ) exitWith {};

if !( nearestTerrainObjects [_checkPos, [], 2, false, true] isEqualTo [] ) exitWith {};

private _tempPos = (AGLToASL _checkPos) vectorAdd [0, 0, 0.8];//ASL for other checks

private _diff = [];
{% endhighlight %}