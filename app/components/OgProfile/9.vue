<script setup>

defineProps({

avatar:{
type:String,
default:"/image/profile.webp"
},

name:{
type:String,
default:"Waliu Waheed"
},

role:{
type:String,
default:"Property Agent"
},

phone:{
type:String,
default:"+234 800 000 0000"
},

website:{
type:String,
default:"abanise.com"
},

skills:{
type:Array,
default:()=>[
"Sales",
"Negotiation",
"Marketing"
]
}

})

</script>


<template>


<div
class="
w-[600px]
h-[950px]
flex
items-center
justify-center
"
>


<!-- ID CARD ONLY -->

<div
class="
relative
w-[420px]
h-[700px]
rounded-[45px]
overflow-hidden
bg-gradient-to-b
from-[#8bd3ff]
via-[#294cb5]
to-[#07143f]
shadow-2xl
"
>



<!-- BLUE LIGHT -->

<div
class="
absolute
-top-40
left-0
w-[400px]
h-[400px]
rounded-full
bg-white/30
blur-[100px]
"
>
</div>




<!-- WEBSITE -->

<div
class="
absolute
top-7
right-7
px-4
py-2
rounded-full
bg-white/15
border
border-white/20
backdrop-blur-xl
text-white
text-xs
"
>

{{website}}

</div>







<!-- PROFILE -->

<div
class="
absolute
top-20
left-1/2
-translate-x-1/2
w-[150px]
h-[150px]
rounded-full
overflow-hidden
border-4
border-white/30
"
>


<img

:src="avatar"

class="
w-full
h-full
object-cover
"

/>


</div>










<!-- GLASS AREA -->

<div
class="
absolute
bottom-0
left-0
right-0
p-8
pt-16
rounded-t-[50px]
id-glass
"
>





<h1
class="
text-white
text-3xl
font-black
"
>

{{name}}

</h1>



<p
class="
text-white/70
text-lg
mt-1
"
>

{{role}}

</p>







<!-- VERIFIED -->

<div
class="
mt-5
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
bg-emerald-400/20
border
border-emerald-300/30
text-white
text-xs
"
>


<Icon

name="heroicons:check-badge"

class="w-5 h-5 text-emerald-300"

/>


Verified Agent


</div>










<!-- CONTACT -->

<div
class="
mt-8
space-y-4
text-white
text-sm
"
>


<div
class="
flex
gap-3
items-center
"
>

<Icon
name="heroicons:phone"
class="w-5 h-5"
/>

{{phone}}

</div>




<div
class="
flex
gap-3
items-center
"
>

<Icon
name="heroicons:envelope"
class="w-5 h-5"
/>

{{name.replace(/\s+/g,'').toLowerCase()}}@abanise.com

</div>


</div>









<!-- SKILLS -->


<div
class="
mt-6
flex
gap-2
"
>


<span
v-for="skill in skills"
:key="skill"

class="
px-3
py-1
rounded-full
bg-white/15
border
border-white/20
text-white
text-[11px]
"
>

{{skill}}

</span>


</div>







<!-- LINE -->

<div
class="
mt-7
border-t
border-white/20
"
>
</div>







<!-- FOOTER -->

<div
class="
mt-5
flex
justify-between
items-center
"
>



<div>

<p
class="
text-white/50
text-xs
"
>
Powered by
</p>


<p
class="
text-white
font-black
text-xl
"
>

ABANISE

</p>


</div>






<div
class="
w-14
h-14
rounded-2xl
bg-white/15
border
border-white/20
flex
items-center
justify-center
"
>


<Icon

name="heroicons:qr-code"

class="
w-9
h-9
text-white
"

/>


</div>


</div>






<p
class="
mt-8
text-center
text-white/40
text-[9px]
tracking-[6px]
"
>

TRUST • VERIFY • CONNECT

</p>





</div>





</div>



</div>



</template>



<style scoped>


.id-glass{

background:
linear-gradient(
180deg,
rgba(255,255,255,.22),
rgba(255,255,255,.08)
);


backdrop-filter:
blur(35px)
saturate(180%);


-webkit-backdrop-filter:
blur(35px)
saturate(180%);


border-top:
1px solid rgba(255,255,255,.3);


box-shadow:
0 -20px 50px rgba(0,0,0,.25);

}


</style>