// https://vike.dev/Head

import logoUrl from "/logo.png";

export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      <meta property="og:title" content="HeroEE" />
      <meta property="og:image" content="https://hero.hithium.com/intro/logo100.jpg" />
      {/* 支持https */}
      <meta property="og:image:secure_url" content="https://hero.hithium.com/intro/logo100.jpg" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
      <meta property="og:description" content="HiTHIUM HeroEE portable power station" />
      <meta
        name="keywords"
        content="Hithium,HiTHIUM HeroEE,HeroEE,Hero,heroEE,平权,平权英雄,海辰平权,深圳海辰,安全，耐用，省钱，储能 ,portable power station,家庭储能系统,户外移动电源"
      />

      <meta name="description" content="HiTHIUM HeroEE 户外移动电源,省钱•安全•耐用的家庭储能系统" />
      <meta name="google-site-verification" content="qfOfo7g_tVNdeMRacXHePdOx69KJlEwd7LT29VPVeAg" />
    </>
  );
}
