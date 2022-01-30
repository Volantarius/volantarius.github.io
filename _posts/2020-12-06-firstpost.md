---

title: "Welcome!"
date: 2020-12-06 00:20:00 -0000
categories: arma
---

# Welcome

**Hello worlds**, asodjiasd.
ALSO NEW?? NEW NEW????

{% highlight sqf %}
if ( _checkPos isFlatEmpty [-1, -1, 0.7, 5, 0, false] isEqualTo [] ) exitWith {};

if !( nearestTerrainObjects [_checkPos, [], 2, false, true] isEqualTo [] ) exitWith {};

private _tempPos = (AGLToASL _checkPos) vectorAdd [0, 0, 0.8];//ASL for other checks

private _diff = [];
{% endhighlight %}