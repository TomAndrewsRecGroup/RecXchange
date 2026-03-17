'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import GlowButton from '@/components/design-system/GlowButton';
import NeonDivider from '@/components/design-system/NeonDivider';
import StatusBadge from '@/components/design-system/StatusBadge';

// ─── Access control ──────────────────────────────────────────────────────────

const INVESTOR_PASSWORD = 'RecXchange@2026';

/** Lower-cased for case-insensitive comparison */
const ALLOWED_EMAILS: string[] = [
  'tom@recxchange.io',
  'tom@andrews-recruitment.com',
  'james@recxchange.io',
  'lucy@recxchange.io',
  'nanda@z5capital.com',
'nick@amecloudventures.com',
'kemal@l37.vc',
'onordlinger@monogramcapital.com',
'fyang@translinkcapital.com',
'morris@brookventure.com',
'charles@eldorado.com',
'david@groundup.vc',
'alex@kickstartfund.com',
'matt@c2ventures.co',
'sohail@s2capital.vc',
'shiliang@ledgerprime.com',
'phil@pontifaxagtech.com',
'michael@tsingcapital.com',
'alex.zubillaga@wmg.com',
'james@bloombergbeta.com',
'pete.bastien@hitachi-ventures.com',
'hxu@sbaif.com',
'marianne.wu@40north.vc',
'micah@foundercollective.com',
'kristin.tooth@bmo.com',
'nick@harmonicgp.com',
'jeff@nextplayventures.com',
'xavier@vamosventures.com',
'mark@thayerventures.com',
'albert@usv.com',
'lisa@toyotaventures.com',
'todd@hqcap.com',
'trish@portfolia.com',
'chris@ret.vc',
'dado@tallwoodvc.com',
'gill@opuscapital.com',
'sdrake@stonylonesomegroupllc.com',
'prc@jdssports.co',
'cj@celticvc.com',
'abirkill@one-ventures.com',
'alex@kingfisherinvestment.com',
'jsantoleri@stoneworkcapital.com',
'amit@blackjays.vc',
'imran@axavp.com',
'brad@trolleyventures.com',
'nathalie@dncapital.com',
'rhoffman@greylock.com',
'joshua.smith@emeraldmanagers.com',
'bt@invus.com',
'khatch@tamarakcapital.com',
'matthew@keiretsuforum.com',
'wfitzgerald@windcrestpartners.com',
'john@mosleyventures.com',
'christian@startupbootcamp.org',
'jtrzepacz@wildcat.vc',
'irena@highlandeurope.com',
'sfriend@baincapital.com',
'drew@firststar.vc',
'blake@ldcap.com',
'bcarroll@vpcadvisors.com',
'ryan@catalyst.com',
'deepak@wavecrestgrowth.com',
'shila@zaneventurefund.com',
'george@ymvsv.com',
'chill@dnacapital.com',
'nik@kaszek.com',
'adriel@k50ventures.com',
'er@lasolasvc.com',
'marlon@crossculturevc.com',
'jonathan.crowder@inteliscapital.com',
'ashok@ironpillarfund.com',
'chemi.p@pitango.com',
'anurag@fortross.vc',
'ela@fifty.vc',
'fred.bachicha@usaa.com',
'kais@visionvc.co',
'didi@wing.vc',
'lt@fintechv.com',
'asalzman@vpcp.com',
'gstevenson@mbventures.com',
'jhchadwick@claritascapital.com',
'tony@aperturevp.com',
'brian@moai.vc',
'pilar@debutcapital.com',
'willson@east.vc',
'ben@up.partners',
'joel@healthxventures.com',
'kinley@manchesterstory.com',
'jt@outboundventures.com',
'stuart.dunbar@bailliegifford.com',
'mm@liquid2.vc',
'tammer@venturesouq.com',
'msinger@oup.vc',
'richard.kim@galaxydigital.io',
'abrasoveanu@accel.com',
'ilya@signalfire.com',
'elizabeth@hustlefund.vc',
'gregg@senahill.com',
'karyn.parra@beigene.com',
'andreas.schwarzenbrunner@speedinvest.com',
'craig@nextlevelvc.com',
'dd@maidenlane.com',
'k.malukov@prytek.com',
'chad@canalpartners.com',
'jason.starr@companyfirst.com',
'clange@shumwaycapital.com',
'db@fivefourventures.com',
'gtewari@omegavp.com',
'nikolai@elysium.vc',
'anne@kairoshq.com',
'gyorgy.simo@dayonecapital.com',
'jeff.rich@hemisphere.com',
'caroline@vitalize.vc',
'marc@plugandplaytechcenter.com',
'tomasz.swieboda@inovo.vc',
'kgacevich@fintechvc.us',
'soraya@trailmix.vc',
'leah@mantaray.vc',
's.bergez@anderapartners.com',
'paul.weinstein@azurecap.com',
'safa@thinkplus.vc',
'diana.e@squareonecap.com',
'john@salveocapital.com',
'vinit@learn.vc',
'peter@rockiesventureclub.org',
'guy.horowitz@us.dtcp.capital',
'jonathan@soundboardangelfund.com',
'rob@hoxtonventures.com',
'ali@generationvc.com',
'bguruswamy@lavniventures.com',
'jamie@uncommoncapital.vc',
'chirag@threshold.vc',
'farris@zenstonevc.com',
'rmohan@nycapartners.com',
'nitin@unshackled.co',
'ashok@gpv.com',
'kevin@jurassiccapital.com',
'anna.zhang@greenoakscap.com',
'john@skylineventures.com',
'marie@flat6labs.com',
'felix.zirkler@truventuro.com',
'mashworth@ttcp.com',
'john@underscore.vc',
'garnet@aperturevc.com',
'eric@greenhousecapital.net',
'aviram@408ventures.com',
'colinjhurd@gmail.com',
'jwise@balderton.com',
'augustin@newfund.fr',
'jearl@coreventuresgroup.com',
'gmadden@svhealthinvestors.com',
'deepen@courtsidevc.com',
'paul@bragielbros.com',
'lgitig@ftvcapital.com',
'michael.millette@hscm.com',
'matt@litani.com',
'mfico@freshdelmonte.com',
'jesse@parkway.vc',
'jalak@fpv.vc',
'mike@canvas.vc',
'juan@energize.vc',
'scott@newlab.com',
'scott@earlylight.vc',
'christoph@pointninecap.com',
'mike@maniv.com',
'richard@knollventures.com',
'sid@siliconroad.vc',
'kent@epicvc.com',
'peter@1bv.co',
'nancy.frettilio@am.jll.com',
'llee@grcfunds.com',
'dan@nextgenvp.com',
'danp@freshsourcecapital.com',
'arik@axon.vc',
'chris.massey@riverbend.vc',
'jason@grandcentraltech.com',
'laura@base10.vc',
'ryan@hashed.com',
'julianne@oregonventurefund.com',
'terry@moorevp.com',
'tilman@flourishventures.com',
'stephen@optumventures.com',
'callner@downingventures.com',
'steve@gigafund.com',
'susan.rempel@hpe.com',
'jseung@fungcapitalusa.com',
'taylor@collaborativefund.com',
'mikep@section32.com',
'joshk@recvc.com',
'niraj@polychain.capital',
'krd@cadenza.vc',
'alexander@468cap.com',
'khaled@valia.vc',
'jennifer@reachcap.com',
'maria.alegre@floriventures.com',
'zvikao@viola.vc',
'gcm@correlationvc.com',
'ben.casnocha@villageglobal.vc',
'steve@startuphealth.com',
'homan@fusionfund.com',
'jen@springbankcollective.com',
'theresa.leddy@ubs.com',
'devon@group11.vc',
'annie@oakhcft.com',
'yi@eplanetcapital.com',
'leah@pegasusventures.com',
'sarah@glynncapital.com',
'champ@creativeventures.vc',
'jason@bcvp.com',
'jon@decibel.vc',
'peter@impcapital.com',
'polina@cambridgespg.com',
'ben@seedstars.com',
'mzabik@redbirdcap.com',
'jmw@thpartners.net',
'kim@initialized.com',
'ed@albion.vc',
'robert@impactscience.vc',
'keith@meetgambit.com',
'jay@breaktrailventures.com',
'abansal@digitalisventures.com',
'jfb@wpglobalpartners.com',
'apostolos@venturefriends.vc',
'paisontheinternet@gmail.com',
'ys@aventurescapital.com',
'kreeser@techfarmscapital.com',
'eli@moneta.vc',
'erdemc@teknasyon.com',
'matt@redhawkadvisory.com',
'ld@emerge.be',
'carine@angelpad.org',
'gareth@promusventures.com',
'akherani@aislingcapital.com',
'jberton@georgianpartners.com',
'krish@brandnewmatter.com',
'jimmy@brandedstrategic.com',
'lindy@breakout.vc',
'aa@sghcapital.com',
'clay@hatterasvp.com',
'cj@amityventures.com',
'ziv.benbarouch@peregventures.com',
'margo@synetro.com',
'michael@solasta-ventures.com',
'apurva@summitpeak.com',
'mary@breadandbutterventures.com',
'ndesai@andavcapital.com',
'rob@elmvc.com',
'rneedham@therisefund.com',
'rick@listen.co',
'bc@eastsidepartners.com',
'david@cre.vc',
'dan@regeneration.vc',
'elizabeth@scribble.vc',
'lkahn@beechwoodcap.com',
'wblake@beringea.com',
'cholekamp@cultivationcapital.com',
'keith@thirdprime.vc',
'murphy@ngenpartners.com',
'jsink@khoslaventures.com',
'elliot@commonwealthvc.com',
'collin@kauffmanfellows.org',
'clara@urbaninnovationfund.com',
'andrew.olsen@boathousecapital.com',
'oliver@lakestar.com',
'ron@sky9capital.com',
'matt@contourventures.com',
'hberk@msdcapital.com',
'jdorsey@nextcoastventures.com',
'ed@reddogcap.com',
'tyler@menlovc.com',
'hai@imo.vc',
'jason@leftlanecap.com',
'acaragan@capitalg.com',
'sanjay@tauventures.com',
'jeffrey@pangeablockchain.ch',
'artur.davydenko@flyerone.vc',
'sigalit@grovevc.com',
'eric@mvp.vc',
'alper.koper@nexus.ventures',
'dsteel@omersventures.com',
'david@tectonic.vc',
'sudhir@indusage.com',
'shonaigh.crowe@workday.com',
'ezra@startingline.vc',
'bill@flarecapital.com',
'ypng@yunqi.vc',
'samshi@lightspeedcp.com',
'jon@trueventures.com',
'peter@barodaventures.com',
'anurag@jungle-ventures.com',
'nina@hivefund.co',
'mick@ethos.vc',
'kevin.bartels@affirm.com',
'durg@knightsgateventures.com',
'psvennilson@thecolumngroup.com',
'marius@three.vc',
'jacob@2150.tech',
'rohan@goodcapital.vc',
'evan.cohen@humanventures.co',
'kareem@msad.vc',
'jim@svdcapital.com',
'paul.kudlow@gmail.com',
'austin@harpoon.vc',
'ihakungokwey@iheartmedia.com',
'george@missionog.com',
'alex@oceanazulpartners.com',
'ivan@scopvc.com',
'alon@drapergorenholm.com',
'greg@costanoavc.com',
'danielle@1517fund.com',
'fanny.rohr@fev.vc',
'craig@moonshotscapital.com',
'trey@r7.vc',
'troberts@harbert.net',
'payal@406ventures.com',
'stefancohen@baincapitalventures.com',
'nokike@645ventures.com',
'addie@avidventures.com',
'dbritts@fusecapital.com',
'frank@silascapital.com',
'sandra@starburst.aero',
'jhamel@cueball.com',
'christian.miele@eventures.vc',
'ko@knockout.capital',
'bmatthews@questm.com',
'clay@stoutstreetcapital.com',
'kelefant@sorensoncap.com',
'daniel@darlingventures.com',
'haim@scapitalvc.com',
'michael@whalerockcapital.com',
'jeremy@newroadcp.com',
'ann@humwin.com',
'jreadey@bulldog.vc',
'dan@ascendstl.com',
'matthias@mighty.capital',
'sal@empactfulcapital.com',
'hubert@healthwildcatters.com',
'sebastian@parallel18.com',
'mayuresh.raut@seafund.in',
'david.cohen@techstars.com',
'yang@k2vc.com',
'ac@sova.vc',
'yc@sociicapital.com',
'raymond.yang@westsummitcap.com',
'zahr@oakstreetrec.com',
'adam@ddc.fund',
'tgootee@elevateventures.com',
'gussmann@quiet.com',
'jraderstorf@ohioinnovationfund.com',
'john@jazzvp.com',
'paul@500.co',
'tsl@meridianstreetcapital.com',
'klee@primersazze.com',
'sheel@robinhood.com',
'luz@draperb1.vc',
'kyleduffy@gradient.com',
'chetan@benchmark.com',
'neil@pilotgrowth.com',
'thanos@charge.vc',
'victor@jsv.com',
'jcherry@consciousventurelab.com',
'sean@siliconcatalyst.com',
'luger@energyimpactpartners.com',
'nabil@graphenevc.com',
'iperelmuter@gridscapital.com',
'ida@twobearcapital.com',
'ssocolof@techcouncilventures.com',
'mfates@ascentvp.com',
'andrew@cornerventures.com',
'lauren@foundersfund.com',
'yuri.sagalov@wayfinder.com',
'karen.adame@jumpstartinc.org',
'ciaran@blueyard.com',
'edgar@sparklabstaipei.com',
'arj@tribecap.co',
'javier@mundiventures.com',
'brandon@xfund.com',
'gabriella@techwildcatters.com',
'ian@ocaventures.com',
'carolina.serra@visa.com',
'jwhite@notion.vc',
'yossi@gemini.co.il',
'rob@wilab.com',
'renaat.berckmoes@fortino.be',
'kirsten@nextfrontiercapital.com',
'cory@samsaracap.com',
'bbenedict@alpinemeridian.com',
'ali@coventure.vc',
'chad@hvstartupfund.com',
'peter@amfamventures.com',
'amontero@salkantay.vc',
'sriram@indusage.com',
'alex@whitebuffalo.capital',
'pat@finncapitalpartners.com',
'michael.hearn@geneseeadvisors.com',
'sunnykumar@gsrventures.com',
'george.cigale@peakstate.vc',
'sophie@oyster.vc',
'alex@conconi.ca',
'alanchen@ally-bridge.com',
'nathan@magmapartners.com',
'dustin@wondervc.com',
'said@stormbreaker.co',
'dkidle@arboretumvc.com',
'arjun@telesoftvc.com',
'kshi@morningside.com',
'doug.renert@tandemcap.com',
'blake@techsquareventures.com',
'pete@navigatingenergy.com',
'emmanuel@pvglobal.com',
'jehlers@dnscap.com',
'kennie@lattitude.vc',
'geoffb@almazcapital.com',
'vik@greencow.vc',
'mike@bullish.co',
'dmitry@stereocap.vc',
'seth@susaventures.com',
'madi@shorooq.ae',
'eric@peak.partners',
'oded@j-impact.fund',
'arul@borderlesscapital.io',
'alice@ahren.co.uk',
'stuart@bluestarinnovationpartners.com',
'jonathan.bradley@rga.com',
'andreas.etten@10x.group',
'prb@varanacapital.com',
'davidh@frontrowfund.com',
'alana@paradigm.xyz',
'laurent@lumalaunch.com',
'rboyle@canaan.com',
'ak@sound-ventures.com',
'gareth@acre.vc',
'jean@ascensionventures.com',
'kdeangelis@austinventures.com',
'marsha@citibank.com',
'jeremy.fiance@thehouse.fund',
'edfrindt@kcrise.com',
'ivan@newage.vc',
'allison@sempervirensvc.com',
'ophelia@blossomcap.com',
'brian@corsaventures.com',
'edelaveau@partechpartners.com',
'andreas@remotefirstcapital.com',
'jinlin.wang@tsingyuan.ventures',
'na@cerracap.com',
'nick@gsdvs.com',
'finn@southparkcommons.com',
'',
'mcardamone@forum.com',
'rui.zhang@gumi-cryptos.com',
'r@maxventures.vc',
'dom@vertexventures.com',
'mkives@k5global.com',
'sarah@cleocap.com',
'bobby@signaturescapital.com',
'limor@gefencapital.com',
'mike.asem@m25vc.com',
'bhallett@miramarvp.com',
'jy@adjuvantcapital.com',
'shamin@tyltventures.com',
'daniel@cherry.vc',
'kate@sep.benfranklin.org',
'andrea@plumalley.co',
'elaine@plgventures.com',
'freada@kaporcapital.com',
'catherine.hawkins@hcahealthcare.com',
'kshitij.golwalkar@powerhouseventures.com',
'jim@navitascap.com',
'grubenstein@raine.com',
'vishal.arora@vdosh.com',
'brett@cavuventures.com',
'sean@volitioncapital.com',
'dana.wright@mathventurepartners.com',
'miles@mosaikpartners.com',
'dberry@flagshipventures.com',
'chenoa@bluestartups.com',
'dennis@intersouth.com',
'michele.trogni@eldridge.com',
'kabramowitz@ngncapital.com',
'axel@bolt.io',
'aakanksha.b@hyderabadangels.in',
'karthee@mfvpartners.com',
'honma@incubatefund.com',
'bhughes@adobe.com',
'rupton@hlcp.com',
'eric@lemnoslabs.com',
'jingcheng.li@fbg.capital',
'michael@rs.ventures',
'sara@truewealthvc.com',
'cyrus@foundersxfund.com',
'joaquim@rwcm.com',
'mike@fcc.vc',
'chiggerson@waldenintl.com',
'colin@twosigmaventures.com',
'linus@signiavc.com',
'chris.reid@intact.net',
'bdavis@sorensoncap.com',
'pejman@pear.vc',
'',
'amanda@willowgrowth.com',
'ran@vertexventures.com',
'steve.mankoff@tdfventures.com',
'jodi@3lcap.com',
'venkatadri.bobba@ventureast.net',
'glenn@quakecapital.com',
'nigel@qedinvestors.com',
'jpalmer@newmarketsvp.com',
'pete@seaeventures.com',
'ilan@dots.build',
'lucy@backendcapital.com',
'tbb@innoenergy.com',
'connor@atlantaseedcompany.com',
'pmorand@openprairie.com',
'sberg@lyticalventures.com',
'dan@pspfunds.com',
'ben.cox@tessella.com',
'sgivens@gambollife.com',
'ivar@trind.vc',
'dayton@bfgpartners.com',
'john@arsenalgrowth.com',
'sarah@atlasventure.com',
'buddy@bbq.capital',
'matty@acp.vc',
'matt@iacapgroup.com',
'peliot@paladincapgroup.com',
'umut@magneticvc.com',
'mskunda@covingtongroupinc.com',
'paul@gtmfund.com',
'craig@converge.vc',
'dkuzmin@hornet-tx.com',
'kc@fuse.vc',
'ttashev@omidyarventures.com',
'andre@mvp-vc.com',
'amag@irongateglobal.com',
'brinkley@tobacapital.com',
'habib@e14fund.com',
'tbg@boldcapitalpartners.com',
'susanmu@7xvc.com',
'q@dnx.vc',
'clax@grandbankscapital.com',
'richard.kim@galaxyinteractive.io',
'yida@shima.capital',
't.rothe@iriscapital.com',
'mileshaladay@gmail.com',
'vinoth.jayakumar@draperesprit.com',
'chihiro@digitx.com',
'pparker@missionbiocapital.com',
'rbendori@evergreen.co.il',
'ytt@hb-ventures.net',
'paul@presencecap.com',
'mdendi@milanoinvestment.com',
'curtis@happinessvc.com',
'hiro@beenext.com',
'adam.goulburn@luxcapital.com',
'lesia@drummondroad.com',
'ambar@ibtikarfund.com',
'cliodhna.adamson@wellsfargo.com',
'greg@global.id',
'anke.reichardt@abbvie.com',
'emilie@gaingels.com',
'william@movingcapital.com',
'ben@g2vp.com',
'dan@firstmarkcap.com',
'bharrington@oup.vc',
'dmakan@iconiqcapital.com',
'edward@pareto20.com',
'maia@juvovc.com',
'marilee.radecki@cmegroup.com',
'aruparelia@affinitycapital.net',
'krista@sugarcap.com',
'sam@blisce.us',
'avi@entreecap.com',
'mmurphy@montageventures.com',
'mabbaei@naplestechnologyventures.com',
'dchao@dcm.com',
'msugarman@mhscapital.com',
'mariano@mgvcapitalgroup.com',
'dulevitch@a16z.com',
'spencer@75andsunny.vc',
'waite@ovp.com',
'rhatoyama@sozo.ventures',
'david@frontiervc.com',
'ran@magenta.vc',
'mike@i2bf.com',
'ajay.singh@databricks.com',
'kasper@bmwiventures.com',
'mac@rpvc.com',
'brandon@hingecapital.com',
'brianne@worklife.vc',
'eric@thursday.vc',
'kurt@elementum.vc',
'kunal@agyaventures.com',
'justin@137ventures.com',
'farouk@fourriversgroup.com',
'cchien@goodwatercap.com',
'nick@notationcapital.com',
'pollard@venngp.com',
'alicia.oconnell@magiclab.co',
'ssutley@tcp.vc',
'hendrik@astanor.com',
'mike@legaltech.com',
'sisaac@ebay.com',
'pel@daphni.com',
'amit@primevp.in',
'kamimaeda@globalbrains.com',
'jp@kecventures.com',
'nick@levervc.com',
'shina@kakao.vc',
'blake@engage.vc',
'chad@43north.org',
'kcperdew@gmail.com',
'dave@battery.com',
'yusen@zhenfund.com',
'andrew.ive@bigideaventures.com',
'paul@brownventuregroup.com',
'mike@trianglepeakpartners.com',
'kslawin@poncetherapeutics.com',
'ga@altpointcapital.com',
'tabreez.verjee@uprising.us',
'aaron@pienza.com',
'alessandro.podda@10xvaluepartners.com',
'dayton@decheng.com',
'kevin@goabstract.com',
'martin@bitkraft.vc',
'junl@svtechventures.com',
'nick@differential.vc',
'csaba@tillerpartnersllc.com',
'jtemplin@betaspring.com',
'karan@chiratae.com',
'jhoag@tcv.com',
'laurie@atoneventures.com',
'nsmith@riceparkcapital.com',
'scott@comeback.vc',
'abg@7pc.vc',
'salbert@aurorafunds.com',
'mark@heartlandvc.com',
'erica@reignvc.com',
'shamiss@alivevc.com',
'steve@savp.com',
'charles@precursorvc.com',
'atul@sixthirty.co',
'mfiske@higgrowth.com',
'whopeman@arborventures.com',
'yuval@cr-vp.com',
'max@thirdact.vc',
'jsharp@hatcher.com',
'chip@3igventures.com',
'john@firebrandvc.com',
'sherman@academyinvestor.com',
'medwards@capricornllc.com',
'dg@runacap.com',
'florian.reichert@picuscap.com',
'kartik@acapital.com',
'ihar@geek-ventures.com',
'lomax@outsized.vc',
'john.fath@btgpactual.com',
'anand@milliwaysventures.com',
'skaplanis@groundbreakventures.com',
'jed@juxtapose.com',
'bucky@kpcb.com',
'samantha@rpsventures.com',
'michael@111westcapital.com',
'eugene.timko@xplorationcapital.com',
'neil.shah@greenoakscap.com',
'mj@nucleusavc.com',
'jedelson@abvlp.com',
'hayley@firstround.com',
'bartow@riverstonellc.com',
'susan@candouventures.com',
'kbelding@nvp.com',
'mlima@monashees.com.br',
'gil@angularventures.com',
'scott.sobel@valorcapitalgroup.com',
'mb@longshotcap.com',
'harsh@claremontcreek.com',
'agreenfield@tiaventures.co',
'shimmel@vanterra.com',
'pfeinstein@bioventuresinvestors.com',
'bbritt@route66ventures.com',
'douga@communitascapital.com',
'zach@startupbootcamp.org',
'paul@sparkcapital.com',
'dave@designerfund.com',
'curta@clearcurrentcapital.com',
'slee@cincytechusa.com',
'craig@akkadianventures.com',
'rbjorkman@sovereignscapital.com',
'johan@quona.com',
'mark@newstack.vc',
'ohad@marker-llc.com',
'dana@marchcp.com',
'ekim@forerunnerventures.com',
'qidong@centregoldcap.com',
'brad@i-hatch.com',
'mr@foxhavencap.com',
'delitzer@nascent.xyz',
'alison@serenaventures.com',
'ammar@momentventures.com',
'salil@uncorrelated.com',
'me@yash.vc',
'andrew@cherubicvc.com',
'seth@gravityfund.vc',
'erin@meruscap.com',
'will@dtvc.com',
'brian.astrove@dapperlabs.com',
'zeshan@fundrx.com',
'tommy@byfounders.vc',
'a.soroka@network.vc',
'lenny@amplifypartners.com',
'alex@actoneventures.com',
'ron@tal-capital.com',
'denis.barrier@cathay.fr',
'dan@broom.ventures',
'lindsay@jls.fund',
'arrola@kfund.co',
'jessica@coyote.ventures',
'mlisker@msdpartners.com',
'mythili@neythrifuturesfund.com',
'adzmel@piva.vc',
'mike@automotiveventures.com',
'nraj@tpg.com',
'paul@vycapital.com',
'evan@milkboxpartners.com',
'hemant@pentathlon.vc',
'krishna.kunapuli@3lines.vc',
'jhays@diamondstateventures.com',
'will@riot.vc',
'lee@patamar.com',
'kirby@base.ventures',
'kareemd@voloearth.com',
'david.kirkham@seedrs.com',
'astinnes@cacptrs.com',
'george@untapped.ventures',
'sunchong@ceyuan.com',
'bpark@crosscreekadvisors.com',
'mike@socialstarts.com',
'nabil@thrivecap.com',
'kevin@meridacap.com',
'dgeballe@sjfventures.com',
'jesse@variant.fund',
'jjkasper@bluecollective.com',
'matt.goldstein@m12.vc',
'jyri@yes.vc',
'ben.li@zillionize.com',
'brandon.adickes@avalabs.org',
'andrew@questvp.com',
'l@lombardstreet.io',
'marc.weiss@ofcap.com',
'soham@9unicorns.in',
'jrichards@ggvc.com',
'jane@cornerventures.com',
'starling.cousley@revolution.com',
'joel@sutton.fund',
'mike@earthshot.vc',
'jens@sonomabrands.com',
'lguo@gladebrookcapital.com',
'david@siddhicapital.co',
'gzardes@emagen.com',
'sean.o'sullivan@sosv.com',
'deepa@delphiventures.com',
'lwang@wiharper.com',
'jos@capricorn.be',
'bkaminski@targetglobal.vc',
'tdare@science-inc.com',
'nick@gfavp.com',
'tamara@theflatirongroup.com',
'jon@northcastlepartners.com',
'rdiaz@longitudecapital.com',
'egeffen@sky-ventures.com',
'cindy@illuminate.com',
'jeff@startupnv.org',
'jack@hyperplane.vc',
'pat@activecapital.com',
'geri@laconiacapitalgroup.com',
'steven@eastlinkcap.com',
'tsexton@claritascapital.com',
'jzhao@lyfecapital.com',
'wayne@seventysixcapital.com',
'carly@primemoverslab.com',
'bkrack@gunder.com',
'zeb@kingriver.co',
'shuly@upwest.vc',
'dave@westlygroup.com',
'ken@blockchange.vc',
'jim@formation8.com',
'agodwin@mba2006.hbs.edu',
'mandar@venturecatalysts.in',
'brian@tribecavp.com',
'emlyn@cp.ventures',
'barkleyc@titletowntech.com',
'nickg@factore.com',
'satya@homebrew.co',
'logan@fin.capital',
'pedro.vasconcellos@pearson.com',
'karl@valuestreamventures.com',
'alex@entradaventures.com',
'aspagnola@dormroomfund.com',
'dkranjac@dynamk.vc',
'emmeline@coda.io',
'phil@peakspancapital.com',
'wendy@burst.llc',
'jenny@rethinkimpact.com',
'alex@3kvc.com',
'joshua@acronymvc.com',
'michael@anchorcapitalgp.com',
'bob@crimsonseedcapital.com',
'dino@sevenpeaksventures.com',
'lz@arcanum.capital',
'justin@typeone.vc',
'max@gbv.fund',
'pburtis@amadeuscapital.com',
'mhoffman@feenixpartners.com',
'lisa@refashiondos.com',
'taekkyung@bigbasincapital.com',
'matus@taliscapital.com',
'james.bagan@frogcapital.com',
'mmajors@datapointcapital.com',
'kim@wakestreamventures.com',
'tchao@tychepartners.com',
'ablock@metaprop.org',
'susan.lyne@bbgv.com',
'chris@unanimous.vc',
'mbailey@b5cap.com',
'scott@highalpha.com',
'hanan@cornerstonevp.com',
'mlee@clevelandave.com',
'xiahong@continue.capital',
'jordan@sinaivc.com',
'monica@ngpcap.com',
'kat@evening.fund',
'flardieg@mubadala.ae',
'jenny@genoavc.com',
'marc@acecap.com',
'guyette@voyagercapital.com',
'justin@collab.capital',
'akumar@accel.com',
'leah.kutches@exeloncorp.com',
'whs@anzupartners.com',
'leo@saatchinvest.co.uk',
'amitsri@firstrays.vc',
'sasamoto@dentsu-v.com',
'art@rallyventures.com',
'jason@stripesgroup.com',
'dwen@up2398.com',
'paul@rightsidecapital.com',
'jdavison@inflectpoint.com',
'jdf@mdv.com',
'daniel@mindset.ventures',
'ftower@goldhillcapital.com',
'ksuslow@sandbridgecap.com',
'cberke@massmedangels.com',
'fred@technexus.com',
'sparks@topspincp.com',
'megan@thehelm.co',
'sammy@blossomstreetventures.com',
'michael@upventures.com',
'tom@heavybit.com',
'daniel@innovationendeavors.com',
'jenn@portlandseedfund.com',
'david@lacventures.com',
'allen@buildingventures.com',
'akalekos@odysseyvp.com',
'grant@align.vc',
'pdunnigan@rccf.com',
'john@sunbridgepartners.com',
'ben@levelequity.com',
'jeff@westloopventures.com',
'b.marshall@icehouseventures.co.nz',
'nathan@grandvcp.com',
'assaf@team8.vc',
'tom@dashfund.co',
'claire@ignitexl.com',
'eric@vine-cap.com',
'lferia@straydogcapital.com',
'tstuart@greenacrecapital.ca',
'anthony@greenbayventures.com',
'kip@silvertonpartners.com',
'julie@fyrfly.vc',
'andrea@xg-ventures.com',
'rachel@redbikecapital.com',
'pierre@tempocap.com',
'pkalkanis@rho.com',
'kevin@relayventures.com',
'kevin@mgv.vc',
'jdavis@radiusventures.com',
'william.kilmer@c5capital.com',
'adam@mendoza-ventures.com',
'jiggs@ovofund.com',
'carrie@curate.capital',
'james@nfx.com',
'dan@deciens.com',
'carmichael@materialimpact.com',
'peter@boulderventures.com',
'avnish@matrixpartners.in',
'eveline@onewayvc.com',
'gavin@atreidesmgmt.com',
'amy@buoyant.vc',
'rich@kevindurant.com',
'sharon@northpondventures.com',
'jeff@chapterone.vc',
'bkoh@venrock.com',
'jp@softbank.co.kr',
'dan@alloyventures.com',
'alex@javelinvp.com',
'paul@raivencapital.com',
'ran@bridgesisrael.com',
'john@greycroft.com',
'phil@goaheadvc.com',
'kimuram@monozukuri.vc',
'ziad@eqxfund.com',
'rachel@musecapital.vc',
'brandon.pilot@bienvillecapital.com',
'tt@gfrfund.com',
'jacob@oryzn.com',
'weston@radiancapital.com',
'james@libertycityventures.com',
'fworthy@pappasventures.com',
'tatiana.solis@abcellera.com',
'consuelo@svlatamcap.com',
'ryan@arthurventures.com',
'sumit@westquad.vc',
'jd@naryavc.com',
'don.doering@colcap.com',
'darwin@goodai.capital',
'chris@clear.ventures',
'sake@primeventures.com',
'gina@pico.partners',
'tom@forteventures.com',
'dcm@adagecapital.com',
'sergio@robleventures.com',
'james@carthonacapital.com',
'david@tenoneten.net',
'greg@dundeevc.com',
'rafal@betatron.co',
'mallun@operatorcollective.com',
'david@compound.vc',
'jordan@prudenceholdings.com',
'lawrence@longworth.com',
'eric@fall-line-cap.com',
'sanket@secocha.com',
'brianne.gaultiere@carta.com',
'davor.hebel@eightroads.com',
'mergen@exponential.partners',
'nick@callaiscapital.com',
'schlotman@connetic.ventures',
'lcontrella@jmi.com',
'tasha@theimpactengine.com',
'fabian@presight.vc',
'felipe@hmccap.com',
'pamela@tsvcap.com',
'susan@uncorkcapital.com',
'matt@pjc.vc',
'cfrances@summitpartners.com',
'ateet@bracketcapital.com',
'daniel@pre-angel.com',
'raazi@unlockvp.com',
'dave.stewart@orange.com',
'jolsen@concordhp.com',
'rachel@qimingvc.com',
'andris@changeventures.com',
'dave@splitrock.com',
'jeff@agilitycap.com',
'nate@unionlabs.com',
'brian.kaas@cunamutual.com',
'mark.schulz@fontinalis.com',
'charlie@brooklynbridgeventures.com',
'fares@wamdacapital.com',
'paul@2048.vc',
'rafael@labventures.co',
'mzerlang@interplay.vc',
'valeria@zomalab.com',
'john@5amventures.com',
'leonardo@xcap.vc',
'igor@smarthub.vc',
'istern@petersonventures.com',
'ron@rainfall.ventures',
'kyane@rallycapventures.com',
'brian@trustventures.com',
'dave@ziggcap.com',
'david@gust.com',
'rbrekka@secondalpha.com',
'peder@columbiapacific.com',
'jeff@bravoscap.com',
'jillian@mourocapital.com',
'jen.dunham@zoom.us',
'rona@tlv.partners',
'laurent.claverotte@total.com',
'rajnish@indianangelnetwork.com',
'tony@squarepegcap.com',
'jf@cambercreek.com',
'pogos@greyhoundcapital.com',
'richard@mountwilsonvc.com',
'ross@blueprint-local.com',
'james@seraphimcapital.com',
'ann@bullpencap.com',
'dv@redswanventures.com',
'mstevens@scubedcap.com',
'steve@cidcap.com',
'nish@inertia.vc',
'fkung@vivocapital.com',
'simon@valor.vc',
'ian@concreterosecapital.com',
'rmylod@annoxcapital.com',
'gordonc@orbimed.com',
'nadav@th-vp.com',
'mayowa@future.africa',
'don@allosventures.com',
'michael.yuan@sig.com',
'antonny@gdpventure.com',
'mazzeo@coatue.com',
'dusan.stojanovic@trueglobalventures.com',
'jason.whaley@rhapsodyvp.com',
'vo@omegafunds.net',
'anurag@3one4capital.com',
'michael@beepartners.vc',
'lbolel@grayhawkcapital.us',
'mcronin@westonpresidio.com',
'johnpaul@kernvg.com',
'wchu@sparklabsglobal.com',
'sarah@pillar.vc',
'clanier@kineticventures.com',
'james@northisland.ventures',
'kelly@dcvc.com',
'matt@betaworks.com',
'fschaufeld@swanandlegend.com',
'jesse@halogenvc.com',
'pauline.lee@coinbase.com',
'chris@color.capital',
'jono@teamlaunch.com',
'cherry@hiro.capital',
'stephanie@theartemisfund.com',
'hiroki@scrum.vc',
'edith@rightventures.com',
'michael@betterfoodventures.com',
'boyce@post.harvard.edu',
'jufberg@atalayacap.com',
'fiona@jvpvc.com',
'lindsay@authentic-ventures.com',
'paul_ng@edbi.com',
'pb@ardent.vc',
'morehead@panteracapital.com',
'luke@magic.fund',
'david.rossow@gatesfoundation.org',
'vish@clearstone.com',
'jake@coinfund.io',
'baris@av8.vc',
'scott@rembrandtvc.com',
'michael.kam@doublepeak.io',
'nick@ignitionpartners.com',
'chris@founderscoop.com',
'gina.domanig@emerald-ventures.com',
'babrams@ibexinvestors.com',
'rob@greatnorthventures.com',
'denes@ourcrowd.com',
'udayan@anthemis.com',
'kumar@tribecaesp.com',
'sarah@glasswing.vc',
'marks@bootstraplabs.com',
'geoff@bedrockcap.com',
'balaji@shastaventures.com',
'jacob@structure.vc',
'paul.patterson@next47.com',
'hayden.williams@brandproject.com',
'robert.coppedge@echohealthventures.com',
'kate@hannahgrey.com',
'pat@panache.vc',
'ron@spv.com',
'sayan.kumar@agilent.com',
'robin@goat.vc',
'michael@ambricap.com',
'zullo@equal.vc',
'benjamin@mechanism.capital',
'bhaskar@unicornivc.com',
'andrew@tqventures.com',
'huiting@altara.vc',
'morsak@worldview.com',
'aileen@cowboy.vc',
'yacine@heartcore.com',
'lgroy@thcap.com',
'ebyunn@centanagrowth.com',
'tariq@dallasvc.com',
'david@brightstonevc.com',
'hendrick@palmdrive.vc',
'buck.jordan@canyoncreekcapital.com',
'keremozmen1@gmail.com',
'bensavage@clocktowerventures.com',
'jdiamond@walkabout.vc',
'aknopp@ekunducapital.com',
'fishman@vectorcapital.com',
'glen@7wireventures.com',
'jehan@kenetic.capital',
'jackie.shoback@1414ventures.com',
'byee@sherpa.com',
'pg@finsightvc.com',
'martin@lumiacapital.com',
'dkerr@flyovercapital.com',
'sanjiv@ov.vc',
'tbliska@crosslinkcapital.com',
'henrik@buckhillcapital.com',
'kihong@strongvc.com',
'tk@wasabiventures.com',
'jt@binarycap.com',
'rodd.macklin@saasventurecapital.com',
'adavalle@jkbcapital.com',
'jenjust@peak6.com',
'v.tigipko@taventures.vc',
'bob@causewaymp.com',
'nikin@frontporchvp.com',
'vazgen@smartgate.vc',
'tw@newark.vc',
'igor@altair.vc',
'mattocks@l2v.com',
'alim@ivp.com',
'richard@frontiercapital.com',
'bipin@titancapital.vc',
'jkim@romuluscap.com',
'whelan@townhallventures.com',
'anshu@whiteboardcap.com',
'danielle@contrarycap.com',
'ldelgado@ideafundpartners.com',
'tim@eniac.vc',
'js@distributedglobal.com',
'pala@breakaway.partners',
'shay@greenfield-growth.com',
'moldeman@tullisfunds.com',
'rhess@cobalt.la',
'andy@fifthdowncap.com',
'rami@nextequity.com',
'john@airtree.vc',
'cindy@capitalx.vc',
'james@levelonefund.com',
'robert@ideashipfund.com',
'josh@betaworks.com',
'kiran@kalaari.com',
'byron@bvp.com',
'aholmes@crescentcove.com',
'matt@fika.vc',
'elias@klicapital.vc',
'paige@behindgeniusventures.com',
'natalie@boldstart.vc',
'andy@sondercapital.com',
'kim@glynncapital.com',
'david@noeticfund.com',
'tom@citylightcap.com',
'kd@mvm.com',
'ian@alchemistaccelerator.com',
'averitt@okapivc.com',
'micah@7thirtycapital.com',
'jordan@tuskventures.com',
'david@otgventures.com',
'asomech@boeing.com',
'andrew@bluesteinassociates.com',
'anita.gupta@kiwiventurepartners.com',
'lori@victresscapital.com',
'rmorrison@adamsstreetpartners.com',
'tmillikin@tpg.com',
'pgire@elaia.fr',
'patricia.moraes@unboxcapital.com',
'ara@ignia.vc',
'bilal@genblock.capital',
'tomas@latitud.com',
'ajay@mithril.com',
'joe@morpheus.com',
'roman@leapglobalpartners.com',
'dgold@accessvp.com',
'alejandro@7bc.vc',
'joky@berkeleycatalystfund.com',
'anna.slemmings@mmcventures.com',
'maxim@cats.vc',
'jamie@greatercolorado.vc',
'rose@localglobe.vc',
'glen@activatevp.com',
'ariana@conscience.vc',
'shahram@civilizationventures.com',
'viken.douzdjian@argonauticventures.com',
'pierre@omidyar.com',
'dsamuel@freestyle.vc',
'melissa@krillionventures.com',
'richard@bam.vc',
'bob@jvpfund.com',
'daniela.nogueira@sonaeim.com',
'monghai@alphasigma.fund',
'fredrik.arvius@nicoya.se',
'pradeep@synventures.com',
'clara@wefunder.com',
'dskok@matrixpartners.com',
'will@thetwentyminutevc.com',
'yajun@epimab.com',
'chuck@startfastventures.com',
'luba@palumni.vc',
'matt@progression.fund',
'jared@rebelfund.vc',
'bsheftel@valorep.com',
'jfelker@boxoneventures.com',
'shakil@alumni.stanford.edu',
'rg@aliumcap.com',
'kwelch@labrador.com',
'heather@oss.capital',
'howiepersonal@gmail.com',
'jkimzey@srfunds.com',
'ramy@1984.vc',
'landon@altvc.com',
'wendy@northzone.com',
'ryan@seedinvest.com',
'jk@fathomcap.com',
'tina@obviousventures.com',
'shurtleff@divergentvc.com',
'patrick.heim@clear-sky.com',
'david@spidercapital.com',
'richard.mergler@true.global',
'graham@heritagegroupusa.com',
'rachel@constructcap.com',
'kerenk@firstime.vc',
'mk@tcg.co',
'olu@ouicapital.vc',
'matt@1212.vc',
'micky@ribbitcap.com',
'sprey@iselectfund.com',
'cristina@truebeautyventures.com',
'jason@propellant.vc',
'agomez@adaravp.com',
'stephan@scalevp.com',
'georgi.mitov@brightcap.vc',
'jamie@lightshedvc.com',
'arnon@83north.com',
'minal@k2globalvc.com',
'nick@blackbird.vc',
'saumitra@mmv.vc',
'jake@btv.vc',
'arman@alevelcapital.com',
'mo@shine.vc',
'emarton@wavemaker360.com',
'john@armorysv.com',
'jeremy@newnorthventures.com',
'spressly@bipcapital.com',
'kanyi@kindredventures.com',
'rlam@imaginationvc.com',
'omar@graphventures.com',
'chase@loud.vc',
'jthomas@tm-partners.com',
'chris@alchemy-fund.com',
'ashton.poole@nqcapital.com',
'mp@signals.vc',
'rich@assetman.com',
'smansour@breakwaterfunds.com',
'brent@originventures.com',
'tom@sandboxindustries.com',
'avidan@root.vc',
'mark.solon@techstars.com',
'michael@eastwardcp.com',
'vinay@firesideventures.com',
'soona@volt.capital',
'greg@anorak.vc',
'justin.kirkpatrick@questacapital.com',
'lucas@cometlabs.io',
'jack.xu@7seasvc.com',
'nharding@cortado.ventures',
'ari@fluxcapital.co',
'abby@primetimepartners.com',
'jens@launchpdh.com',
'rfreedman@coralcapitalsolutions.com',
'bill@fernbrookmgmt.com',
'pklingenstein@aberdare.com',
'daniel.gwak@point72ventures.com',
'tracy@1843capital.com',
'greg@trivalleyventures.com',
'markus@enzoventures.eu',
'kevin@delphidigital.io',
'mark@fmcap.com',
'neeraj@cervinventures.com',
'daniel@breyercapital.com',
'bnorton@lumiracapital.com',
'jeff@rlc.ventures',
'neal@baypartners.com',
'agu@dh.vc',
'david@impellent.vc',
'rohit@sterling.vc',
'brian@topmarkpartners.com',
'dave@bettorcapital.com',
'zal@refactor.com',
'niklas@atomico.com',
'ryan@pathbreakervc.com',
'megan@altimetercapital.com',
'awyniecki@infraviacapital.com',
'tom@newscienceventures.com',
'ldevries@grotech.com',
'ryan@finventurestudio.com',
'kim.ruggiero@verizon.com',
'evgeny@beringcapital.com',
'sunil@ubiquity.vc',
'wcowen@longriverventures.com',
'gary@socialleverage.com',
'samara@chingona.ventures',
'mike@moradoventures.com',
'neal_bhadkamkar@monitorventures.com',
'marten@kreoscapital.com',
'morgan@manaventures.vc',
'wcantwell@crescendoventures.com',
'don@beondeck.com',
'vik@dreamers.vc',
'ernst@bluebearcap.com',
'christina@upsidevc.com',
'brad@atxseedventures.com',
'bgoldsmith@updata.com',
'greg@sprucecp.com',
'jurgen@launchpad.vc',
'venk@montavc.com',
'jim@steelpointcp.com',
'will@elizabethstreet.vc',
'david@liveoakvp.com',
'javierolvera@brainstorm.vc',
'tiby@keyinvestmentpartners.com',
'vagan@cmventures.com',
'mguliner@apollo.com',
'jeremy@ausum.vc',
'harry.man@matrixpartners.com.cn',
'sm@10tfund.com',
'hemant@taurus.vc',
'ben.forman@parafi.capital',
'michael@ionpacific.com',
'sarnold@polarispartners.com',
'shomik@highergroundlabs.com',
'dinkar.jetley@pivotinvestment.com',
'jgordon@stage1ventures.com',
'jai@tektonventures.com',
'jroot@usvp.com',
'edith@500startups.com',
'courtney@avp.vc',
'akt@alter.global',
'martin@incisive.vc',
'jesse@sweaterventures.com',
'mjacobson@iconiqcapital.com',
'sanger@texoventures.com',
'jenni@nextplaycapital.com',
'heath@redtreevc.com',
'jaddiego@alsop-louie.com',
'ian@valenceventures.com',
'jessica@work-bench.com',
'sean@profounderscapital.com',
'gonzalo@cardumencapital.com',
'melissa@dig.ventures',
'samir@starbridgevc.com',
'jonathan@thecraftory.io',
'eatkinson@commodorecapital.com',
'gilles@thefamily.co',
'ckam@folius.ventures',
'vgarg@better.com',
'sean.li@ambergroup.io',
'btamashunas@seaportcapital.com',
'jay@stage2.capital',
'shomik@overture.eco',
'eric@s3vc.com',
'matt@foresitecapital.com',
'hornik@lobby.vc',
'ullas@streamlinedventures.com',
'mario@windforceventures.com',
'jpavlik@rwbaird.com',
'philip.austin@anterracapital.com',
'julian@schematicventures.com',
'ravi@newviewcap.com',
'adam@struckcapital.com',
'anatoly@solana.io',
'jlehman@rachelzoe.com',
'juliet@bondcap.com',
'ernesto@microventures.com',
'beth@touchdownvc.com',
'amish@sierramaya360.vc',
'nitay@verissimo.vc',
'craig@energytransitionvc.com',
'martha@brewerlane.com',
'andy@drivecapital.com',
'maggie@gener8tor.com',
'shawn.ellis@nfp.com',
'michael@plugandplaytechcenter.com',
'kevin@focusventures.com',
'lily@osf.co',
'matt.zuga@highcape.com',
'jeff@springtimeventures.com',
'stephanie@e2jdj.com',
'arunas.chesonis@safar.partners',
'meghan@amplifyherventures.com',
'patrick@swayvc.com',
'stefan.tirtey@commerzventures.com',
'nicky@theyieldlab.com',
'ben@monochrome.vc',
'dimitri@surface.vc',
'jlevy@redline-capital.com',
'ethan@craftventures.com',
'umesh@thomvest.com',
'troy@gener8tor.com',
'brian@oceans.ventures',
'nir@dgnl.vc',
'jc.ruffalo@covefund.com',
'jeffrey@mantisvc.com',
'cleong@argentumgroup.com',
'loh_alison@cat.com',
'dave@01a.com',
'jeff@interlock.vc',
'vwang@hof.capital',
'justin@vision-ridge.com',
'rparker@mercatopartners.com',
'tom@oneplanetops.com',
'luke@artesianinvest.com',
'mike.brown@bowerycap.com',
'firas@companyon.vc',
'jim@breakthroughenergy.org',
'rick@onset.com',
'david.manjarres@seventure.fr',
'haines@abingworth.com',
'carmen@makeinla.com',
'jeffrey@genesisinnovationgroup.com',
'rad@nbvp.com',
'mac@hdscapital.com',
'lior@cyberstarts.com',
'benedikt.kronberger@btov.vc',
'kyle@explorerequity.com',
'heidi.kim@bcgdv.com',
'ty@ironspring.com',
'david.kenney@vertuelab.org',
'jeffrey.horing@ncino.com',
'mb@illuminatefinancial.com',
'mnichols@commerce.vc',
'matt@castleisland.vc',
'topher@svangel.com',
'bruce@bmpvc.com',
'anna.mason@revolution.com',
'hiram.vazquez@sevensevensix.com',
'jwr@mazarineventures.com',
'eyal@iconyclabs.com',
'ameet@goldenvp.com',
'rnag@superbio.ai',
'pgreenwell@lkcm.com',
'ayafi@byvp.com',
'matt@prysmcapital.com',
'sgribov@flintcap.com',
'andrew@s28capital.com',
'jean@kimaventures.com',
'mirza@aldrichcap.com',
'ss@lvf.vc',
'nick@illuminaventures.com',
'dg@garage.vc',
'kenneth.li@mdi.vc',
'phil.morle@mseq.vc',
'ga@bluescorpioninv.com',
'bdupont@chartline.com',
'ned@goalventurepartners.com',
'jsgamble@bluventures.com',
'steve@collaborativefund.com',
'michael@solasbio.com',
'jonathan@saiseiventures.com',
'lars@eqtventures.com',
'fmarcum@relevancecapital.com',
'sam@weatherfordcapital.com',
'mmurphy@rosecliffvc.com',
'adam@lookingglass.vc',
'rob@asymmetry.vc',
'will@hcp.com',
'whurley@eclipticcapital.com',
'jh@loopinsure.co',
'sam@chetritventures.com',
'dzilberman@warburgpincus.com',
'nate@elefund.com',
'kspain@emcap.com',
'rickyg@violagrowth.com',
'steve@uluventures.com',
'joe@iconventures.com',
'dan@edisonpartners.com',
'micah@canopyboulder.com',
'sarah@indexventures.com',
'jennifer@january.ventures',
'thomas.dhalluin@airbusventures.vc',
'n@mila.vc',
'jon@worldtradeventures.com',
'amiram@jalventures.com',
'wtsu@alleycorp.com',
'andrew.palmer@tamr.com',
'gene@loupventures.com',
'karthik@blume.vc',
'simone@cocoonigniteventures.com',
'max@apolloprojects.com',
'williamdai@shangbaycapital.com',
'siva@datatech.fund',
'sammi@arcadiancap.com',
'brett@bonfirevc.com',
'alex@newformcap.com',
'ir@aquiline.com',
'dave@gv.com',
'pdiaine@stormventures.com',
'twhalen@freshtrackscap.com',
'fred@tracvc.com',
'linda.strydom@prosus.com',
'walther@outlierventures.io',
'bob@york.ie',
'jstobo@abscapital.com',
'sander@lifeforcecap.com',
'jmoshkovich@8vc.com',
'triciaborne@seraphgroup.net',
'dan@regen.vc',
'rodolphe@alven.co',
'brian@recurring.capital',
'm.hastings@provequity.com',
'giannuzzi@sherbrookecapital.com',
'samir.ghosh@frontures.com',
'bill@unusual.vc',
'charlotte.coker@barclays.com',
'steven@worldquantventures.com',
'henrik@prehype.com',
'sherrard@eonxi.com',
'kirsty@ycombinator.com',
'nschubart@company.co',
'adrian@caraov.com',
'blake@ludlowventures.com',
'rudy@westerntech.com',
'mark.richey@att.net',
'will@lsvp.com',
'rob@tapas.capital',
'gmitchell@angelventures.vc',
'joel@renewalfunds.com',
'hornik@augustcap.com',
'devdutt@crv.com',
'kdesai@interwest.com',
'shraga@magmavc.com',
'matt@m13.co',
'mqc@roseparkadvisors.com',
'marisa@aliavia.vc',
'jct@connectivity.vc',
'robert@cascadeseedfund.com',
'keckert@tfxcap.com',
'bruce@healthvelocitycapital.com',
'andy@argon.vc',
'bennett@triblock.co',
'peter@alignedclimatecapital.com',
'todd@nationsventures.com',
'uparikh@mayfield.com',
'byu@sierraventures.com',
'vbeasley@preludeventures.com',
'juan@tectonicventures.com',
'sstull@advantagecap.com',
'dcronkey@xseedcap.com',
'daphne@westcap.com',
'rward@meritechcapital.com',
'evan@teamworthy.com',
'bennett@a-star.co',
'matt@theyingfund.com',
'brit@offline.vc',
'roy@zerogravitycap.com',
'ops@bluepointeventures.com',
'rt@caffeinatedcapital.com',
'clinton@crosscut.vc',
'jarrid@harlem.capital',
'jun@wisemontcapital.com',
'andrew@artisanalv.com',
'kirthiga@f7ventures.com',
'randy@vistaracapital.com',
'jerry@hardwareclub.co',
'maryanna@future.ventures',
'noel@trinityventures.com',
'devin@ecosystemintegrity.com',
'jmastal@marlinspikecapital.com',
'csoderstrom@gpgventures.com',
'sailesh@anthillventures.com',
'florez@newtopia.vc',
'tazia@closedlooppartners.com',
'anup.jacob@virgingreenfund.com',
'sellis@pentamezz.com',
'steve.dorsey@sagemount.com',
'pl@fulcrumep.com',
'karin@serraventures.com',
'agada@iangels.com',
'jd@elephantvc.com',
'kevin.frick@serentcapital.com',
'dlittle@long-ridge.com',
'ashley@creative.co',
'jlevy@zelkovavc.com',
'shawn@threetreeventures.com',
'guy@squadra.vc',
'brian@flywheelfund.vc',
'gopi@sure.ventures',
'ashish.taneja@growxventures.com',
'john.flynn@actventure.capital',
'mukularora@saifpartners.com',
'td@proof.vc',
'liron@meron.co',
'josh@tenzing.vc',
'bob@defy.vc',
'aaron@radical.vc',
'phil@borealisventures.com',
'hlmcnamara@greatoaksvc.com',
'amnon@cedarfund.com',
'christine.blehle@ambina.com',
'rverratti@tlventures.com',
'speterson@lionheart.vc',
'trich@declarationpartners.com',
'david.bassani@zx-ventures.com',
'farooq@prefaceventures.com',
'mike@datatribe.com',
'suresh@saamacapital.vc',
'brad.cooper@capitalz.com',
'perry@aifund.ai',
'bnarasin@nea.com',
'bobby@cotacapital.com',
'spencer@firstminute.capital',
'ngutterson@radicle.vc',
'hubert@endeit.com',
'tknowles@gratituderailroad.com',
'sebastian.bernales@humboldtfund.com',
'will@rre.com',
'oskar@theuntitled.vc',
'jesse@iaventures.com',
'david@uncommonvc.com',
'moody@foundrygroup.com',
'tom@tenayacapital.com',
'kpelowski@pinnacleven.com',
'boris@versionone.vc',
'tduff@generalatlantic.com',
'jenny@supernode.vc',
'kelly@gritventures.com',
'ari@blocktower.com',
'chad@spacecapital.com',
'crystal@lowercasellc.com',
'mfournier@serenacapital.com',
'erich@peakbridge.vc',
'mike@resolute.vc',
'alex@greenegg.vc',
'eslam@global.vc',
'bert@vitalitycapitalllc.com',
'neal@zoiccapital.com',
'arheiskell@wellington.com',
'rob@chicagoventures.com',
'steve@activantcapital.com',
'binh@500startups.com',
'aaron@firstmilevc.com',
'netalie@triventures.vc',
'bryce@accessventures.org',
'chip@flybridge.com',
'ray@blackhornvc.com',
'vasu@wax.insure',
'namek@siliconbadia.com',
'matias@psymed.ventures',
'bart@blockchain.capital',
'saw@jmkconsumer.com',
'shruti@array.vc',
'eric@adit.vc',
'amy.mccullough@trilogyequity.com',
'tony@firstascent.vc',
'pen@innovating.capital',
'carmen@felixcap.com',
'jovina@pfmlp.com',
'tiang@nextbilliongrowth.com',
'oren@soundmedia.vc',
'paul@grit.vc',
'nico@aficapitalpartners.com',
'shannon.blair@blu.biz',
'alex@n49p.com',
'ricardo@tomahawk.vc',
'ryan@legendary.vc',
'ax@ngv.us',
'spann@razorsvc.com',
'amj@stage1capital.com',
'erin@av.vc',
'jb@embedded.ventures',
'natalie@imaginary.co',
'fatima.mirza@evonik.com',
'roman@nrgvc.com',
'ian@cantos.vc',
'michael@overline.vc',
'alexandra.monaco@amcnetworks.com',
'laura@theventure.city',
'nicole.mercede@morganstanley.com',
'jon@torchcapital.vc',
'adam@lilling.com',
'wendy.ardrey@pivotallifesciences.com',
'kyleh@goldcleats.com',
'rthompson@averesystems.com',
'robert_habermeier@polkadot.network',
'ben@ridgelinepartners.co',
'conor@ffvc.com',
'amy.ward@momenta.partners',
'rpb@trucks.vc',
'br@840vp.com',
'blake@pelionvp.com',
'carrie@acapital.com',
'adam.ross@goldcrest.co',
'tod.sacerdoti@flexcapital.com',
'rogelio@altaventures.com',
'deborah@starvestpartners.com',
'ben@thefan.fund',
'mstad@dragoneer.com',
'arjan@corevc.com',
'vidushi@kae-capital.com',
'rweisskoff@fprimecapital.com',
'jbaer@capitalfactory.com',
'andreas@tampabay.ventures',
'lan@basisset.ventures',
'gaurav@afore.vc',
'bharrison@p3vc.com',
'cjl@conversioncapital.com',
'fournier@credoventures.com',
'gtanner@quantumep.com',
'fernando@matterscale.com',
'sean@starship.vc',
'mdudas@6thman.ventures',
'evgenia@dawncapital.com',
'tim@essencevc.fund',
'andreas.etten@flex.capital',
'tx@karlinvc.com',
'geoff@antifund.vc',
'todd@transformcap.com',
'ofer@ylventures.com',
'carlie@storyventures.vc',
'cain@kdtvc.com',
'drake@human.capital',
'terranceberland@kirenaga.com',
'louis.bock@santeventures.com',
'andrew@blueheroncap.com',
'arlan@hirerunner.co',
'grace@tidemarkcap.com',
'bkam@sequoiacap.com',
'lr@digitalhorizon.vc',
'jb@capnamic.com',
'david.singer@maverickcap.com',
'jan.miczaika@hvventures.com',
'rob@nextviewventures.com',
'sergey.vasilev@startacapital.com',
'brendan@fifthwall.vc',
'rohan@westwavecapital.com',
'vitaliy@zingcapital.com',
'bjordan@renlife.ru',
'joe@counterpart.vc',
'iain@guildcap.com',
'pavel@gva.capital',
'klemchuk@sequoiacap.com',
'henry@durablecap.com',
'dmoreira@zenoventures.com',
'bo@ceyuan.com',
'mkrajukhina@rtp.vc',
'michael@overtonvc.com',
'darren@dreamit.com',
'jmurray@exsightventures.com',
'ben.malka@northhillventures.com',
'gregory.beutler@blackstone.com',
'jon.birdsong@atlantaventures.com',
'sungerer@enertechcapital.com',
'chris@fuelcapital.com',
'jebinger@brv.com',
'bweinberg@blueprinthealth.org',
'pmuoio@sinewave.vc',
'steve@atv-ventures.com',
'leland@subversivecapital.com',
'abe@congruentvc.com',
'kcash@impactamericafund.com',
'cary@thirdrockventures.com',
'agate@norrsken.vc',
'gokeeffe@lspvc.com',
'ryan@greenpoint.partners',
'tomb@activeimpactinvestments.com',
'pkolchinsky@racap.com',
'briceyda.torres@ge.com',
'pgrua@hlmvp.com',
'mike@stagedoto.com',
'mansoor@blockchainff.com',
'achapman@rosemoorcapital.com',
'jbarbano@ignitefarm.com',
'robert@inspirationvc.com',
'harsh@wireframevc.com',
'clem@arrowrootcapital.com',
'cole@windwardventures.com',
'emma.cui@longhash.vc',
'jtaub@hetz.vc',
'adam@boost.vc',
'grigorii@mindrock.capital',
'alex@scifi.vc',
'audrey.soussan@ventechvc.com',
'dan@sfermion.io',
'frederic@diagram.ca',
'brian@willventures.com',
'ash@ashrust.com',
'mason@veteranventures.us',
'sarah@swatequitypartners.com',
'chris@inovia.vc',
'trey.buck@gravityventures.com',
'jehrlich@foundationcap.com',
'mike@brightonparkcap.com',
'jisler@deerfield.com',
'larry@phytopartners.com',
'alex@ridge.vc',
'dimitri@rtp.vc',
'dmandel@emerging.vc',
'wes.womack@docusign.com',
'sjones@halstatt.com',
'jeremy@winfunding.com',
'brad@primary.vc',
'radhesh@arka.vc',
'yaniv@lool.vc',
'adam@id8investments.com',
'mbellows@maccabee.vc',
'nthompson@bcapgroup.com',
'daniel@borocapital.com',
'rickh@fintopcapital.com',
'ben@wavegp.com',
'amr@azizventures.com',
'ryan@weekend.fund',
'simon.king@octopusventures.com',
'john@rusticcanyon.com',
'alesha.petrov@gilead.com',
'chris@lowercarboncapital.com',
'manuk@granatusventures.com',
'brett@redesignhealth.com',
'rickm@roguevp.com',
'wboulais@tensilityvc.com',
'beth.r.rockwell@jpmchase.com',
'charlie@angelmd.co',
'john.pinkerton@baldor.abb.com',
'karan@casaverdecapital.com',
'ben@nightmedia.co',
'jflynn@deerfield.com',
'sterling@winklevosscapital.com',
'erich@ridgelinevc.com',
'simon@creandum.com',
'heyu@fresco.vc',
'dbaldwin@breakaway.com',
'wes@scoutventures.com',
'phil@vaynermedia.com',
'marcs@floridafunders.com',
'meagan@spacefund.com',
'achalmers@stadiaventures.com',
'james.richards@garudaventures.com',
'wlese@braemarenergy.com',
'mona@valoventures.org',
'salim@powerhouse.vc',
'mm@runwayvp.com',
'andrew.williamson@cic.vc',
'tipatat@thevrfund.com',
'twick@abry.com',
'pietro@connectventures.co',
'aaron.applbaum@mizmaa.com',
'moshe@igpcapital.com',
'ryan@irongatecapital.com',
'nassim@eternacapital.com',
'uwe@project-a.com',
'ed@alpine.vc',
'jfk@azafranpartners.com',
'byron@prefixcapital.com',
'marie@realistventures.com',
'kevin@reflectiveventures.io',
'sam@moderneventures.com',
'vberl@newageventures.net',
'jeannine@katalyst.ventures',
'mark@harmonyvp.com',
'geoffrey@arringtonxrpcapital.com',
'nate.lentz@osageventurepartners.com',
'javirett@gspring.com',
'theo@9yardscapital.com',
'aarshay@switch.vc',
'ken@saintscapital.com',
'diego.gomez@artemisgrowth.com',
'charlie@venturesouth.vc',
'm.villasenor@redwood.ventures',
'tyson@wilab.com',
'chris@elsewhere.partners',
'jsriney@gmail.com',
'duncann@communitascapital.com',
'nfarzad@morgannoble.com',
'arjun@floodgate.com',
'sraney@redpoint.com',
'adam@windhamventures.com',
'bandrews@ewhv.com',
'talia@kompas.vc',
'brian@counterview.vc',
'rdavaloor@bluecloudventures.com',
'sia@seedcamp.com',
'kyle@deltavcapital.com',
'pg@tuesday.vc',
'hazel.naik@c4v.com',
'uphonest@uphonestcapital.com',
'avichal@electriccapital.com',
'alex@amberstone.com',
'aditya.swarup@rakuten.com',
'mh@1011vc.com',
'peter@unpopular.vc',
'elizabeth@sogalventures.com',
'gideon@leaders-fund.com',
'anupam@emergent.vc',
'kevin.li@lyzzcap.com',
'ross.martin@lunchpartners.co',
'vb@av.co',
'jrezneck@geodesiccap.com',
'miguel@gilgameshvc.com',
'sean@fintech.io',
'olaf@polychain.capital',
'andrew@protonenterprises.com',
'bill@beliade.com',
'aaron@tolacapital.com',
'wally@sav.vc',
'heather@flyingfish.vc',
'steve@alphavp.com',
'pete@secondave.com',
'john@2l.vc',
'jamie@tamarackglobal.com',
'shannon@madrona.com',
'cpicard@investpsp.ca',
'olivia@operatorpartners.com',
'maggie@fuelventurecapital.com',
'yk@trgc.io',
'mike@innosphereventures.org',
'lupu@earlybird.com',
'adith@gembacapital.in',
'khood@fusionxventures.com',
'anya@healthy.vc',
'anthony@serafund.co',
'victoria@felicis.com',
'rkundich@trincapinvestment.com',
'dana@upfront.com',
'eric@isaventures.com',
'nelly@bethnalgreenventures.com',
'lkolodny@acrewcapital.com',
'lafstec@firstlaunchcapital.com',
'akukutai@finistere.com',
'ben@nextworldcap.com',
'amy.weber@mckesson.com',
'atodak@plymouthgp.com',
'stephen@panoramapoint.com',
'apappas@pappasventures.com',
'kevin@mtechcapital.com',
'dwarnock@camdenpartners.com',
'andy@tippetpartners.com',
'strangem@amazon.com',
'estenzler@liontree.com',
'wiley@alerion.ventures',
'jennifer@aspectventures.com',
'elisabeth@striim.com',
'miki@hikevc.com',
'rami@boutiquevc.com',
'jake@sageviewcapital.com',
'bw@640oxfordventures.com',
'yash@benhamouglobalventures.com',
'bginalski@ripple.com',
'bill@g51.com',
'gene@canapi.com',
'bparks@bigfootcap.com',
'hugues@globalfounderscapital.com',
'rafi@bowcapital.com',
'lucas@outlanderlabs.com',
'robin@elevate.vc',
'john@jventures.com',
'cheng@mtvlp.com',
'lduan@hedosophia.com',
'rob@thirdpointventures.com',
'rob@agfunder.com',
'jim@mavenventures.com',
'barry@keiretsucapital.com',
'willp@frontline.vc',
'peter@sinovationventures.com',
'tschaller@nea.com',
'madhu@rocketship.vc',
'kelli@sixty8.capital',
'brian@expertdojo.com',
'seth.bernstein@alliancebernstein.com',
'bernard@grayventures.com',
'areinersman@munichre.com',
'john.rocha@newchip.com',
'deigen@purplesun.com',
'nino@sapphireventures.com',
'schatzy@brandedstrategic.com',
'minerj@ccf.org',
'hill@corsair-capital.com',
'niv@shrug.vc',
'simon@greenvisorcapital.com',
'keith@crancap.com',
'semil@haystack.vc',
'ammar@adaptvc.co',
'austin@slauson.co',
'milan@mantisvc.com',
'bjorn@allianceventure.com',
'jenny@gft.vc',
'rahul@formationve.com',
'dan@radicleimpact.com',
'darscott@compasstechpartners.com',
'palvi@psl.com',
'john@realventures.com',
'chang@basisset.ventures',
'nikhil@footwork.vc',
'jordan@accelfoods.com',
'dan@notleyventures.com',
'maciej.balsewicz@bvalue.vc',
'brady@avalon-ventures.com',
'jim@altos.vc',
'harold@terravp.com',
'mark.white@prairiecrestcapital.com',
'yamen@olivetreecapital.com',
'arnaud@aicapital.ai',
'mfrakman@em.vc',
'dbenoit@endeavorco.com',
'gsmith@whatif.vc',
'reloff@latcap.co',
'ken@pxlperfectventures.com',
'daymond@daymondjohn.com',
'rj@stratminds.vc',
'willp@capria.vc',
'wendy.coya@vocappartners.com',
'erik@interlacevc.com',
'brian@lightship.capital',
'peter@embark.vc',
'richard@fabric.vc',
'spencer@decathloncapital.com',
'kenzi@au21.capital',
'bob@techpioneersfund.com',
'nick@1confirmation.com',
'homan@newgenvc.com',
'qipei@brainrobotcap.com',
'dlk@londonvp.com',
'arenteria@humana.com',
'kiudicello@realicap.com',
'kingm@fcavp.com',
'tony@rockcreekcapllc.com',
'vinay@archergray.com',
'em@amadeoglobal.com',
'masha@dayoneventures.co',
'david@laconiacapitalgroup.com',
'tim@pioneerfund.vc',
'benjamin.ratz@nordicmakers.vc',
'jennifer@cayugaventures.com',
'alyssa@industryventures.com',
'phil@race.capital',
'rajat@prototype.capital',
'keyan@crescentfund.vc',
'susan@renegadepartners.com',
'laschebrook@gsvfg.com',
'yigit@vela.partners',
'mcasady@vestigoventures.com',
'luke@chaacventures.com',
'tammy.kiely@gs.com',
'pascal@longjourney.vc',
'eric@impactvc.com',
'jzimmerman@generalcatalyst.com',
'rstanula@tiaa.org',
'diana@xrclabs.com',
'wilson@ssmpartners.com',
'elise@futureshapellc.com',
'andreas@dfj.com',
'lawrence@upslope.vc',
'anna@xfactor.ventures',
'ita@gingerbreadcap.com',
'y.yamamoto@umi.co.jp',
'amish@firstmarkcap.com',
'jtoth@riverside.ac',
'david@blumbergcapital.com',
'justin@goldengate.vc',
'fmessano@newschools.org',
'josh.elser@sgep.com',
'russell@whitecapvp.com',
'mt@expa.com',
'rob@bioeconomy.capital',
'sumeet@swiftarcventures.com',
'fubini@xyzvc.com',
'jake@detroitventurepartners.com',
'robey@alphaedison.com',
'tchou@vertical-group.com',
'mike@jumpcap.com',
'nick@whitestarvc.com',
'erigonatti@astellainvest.com',
'kevin@thegroup.ventures',
'gonzalo@bryantstibel.com',
'panos@marathon.vc',
'william@muckercapital.com',
'roger@ngc.fund',
'arsani@logoscapital.com',
'chris@joyancepartners.com',
'ram@sherpalo.com',
'jim@silversmith.com',
'nathan@airstreet.com',
'lpb@goldenseeds.com',
'jennifer.m.griffiths@nasa.gov',
'bbahram@exceleratehealth.com',
'jkaplan@balancepointcapital.com',
'patric@foundamental.vc',
'sue@aminocapital.com',
'travis@pruvencap.com',
'ryan@sustainablefoodventures.com',
'glittle@morgenthaler.com',
'davidtietjenwiener@beresfordventures.com',
'cjb@pallasiteventures.com',
'jim@leadedgecapital.com',
'keith@xplorer.vc',
'vassil@11.me',
'ajit@artiman.com',
'mbuffington@panoramic.vc',
'dave@vvp.vc',
'rchabra@rho.com',
'jonathan@sandalphoncapital.com',
'henric@playventures.vc',
'lberyl@rocketplace.com',
'amy.williams@netapp.com',
'ben@212angels.com',
'zhuxh@zmtcapital.com',
'will@giantleapfund.vc',
'jaidev.shergill@capitalone.com',
'cmcdermott@rockportcap.com',
'giovanni.leo@innogestcapital.com',
'paul@elabvc.com',
'manor@olivetree.vc',
'raj.date@fenwaysummer.com',
'gideon@neweracp.com',
'shailesh.ghorpade@exfinityventures.com',
'daniel@unreasonablecapital.com',
'js@angelinvest.ventures',
'troy@qanda.la',
'wes.lyons@eagleventurefund.com',
'madding@camponeventures.com',
'amoreno@acmgrp.com',
'yishai@blueredpartners.com',
'rob@cosimoventures.com',
'judith@lafamiglia.vc',
'cole@elysianparkvc.com',
'ann@engine.xyz',
'marcus@jsf.co',
'joe.beard@perotjain.com',
'enisselson@ldv.co',
'scott.shleifer@tigerglobal.com',
'erik@crane.vc',
'shawn@parade.vc',
'kevin@powerplantvc.com',
'djones@chrysalisventures.com',
'andy@cen.vc',
'alisa@hydeparkvp.com',
'phyllis@playground.global',
'nfarzad@fcventures.com',
'mike@g20vc.com',
'hampus@truesight.vc',
'eshwar.belani@crescendo-ai.com',
'neil.wolff@oxfordangelfund.com',
'sid@peakventures.vc',
'nkapur@ttvcapital.com',
'ecolby@quadrillecapital.com',
'jocy@iosg.vc',
'jiucker@cataliocapital.com',
'chester@atomic.vc',
'alon@hanacovc.com',
'ian@powerhouse.vc',
'alex@fiat.vc',
'allan@kginvest.net',
'max@newdoventure.com',
'nikos@kairosventures.com',
'timo@lifelineventures.com',
'jeffreyk@wndrco.com',
'skip@assetman.com',
'rcano@k1im.com',
'shaz@karlani.com',
'mark.goldstein@builders.vc',
'justin@eclipse.vc',
'dlucquin@sofinnovapartners.com',
'ashley@firework.vc',
'auber@sofinnova.com',
'gc@wcg.co',
'austin@springtide.com',
'uri@accelmed.co.il',
'evan.lovell@virgin.com',
'cnordan@tcap.com',
'barend@hummingbird.vc',
'sam@mastryinc.com',
'dave@vinestventures.com',
'rob.tucci@texashalofund.com',
'dan@supplychainventure.com',
'douglas.crawford@missionbaycapital.com',
'brett@v1.vc',
'henry.xue@cybernaut.com.cn',
'dsica@sicaventures.com',
'tchurbuck@aeroequity.com',
'jk@amasia.vc',
'ehebb@maveron.com',
'jr.smith@evolutionequity.com',
'tami@vertexventures.co.il',
'rob@stagevp.com',
'david@wavemaker.vc',
'chris@placeholder.vc',
'zach@coelius.vc',
'cfreedman@secondcenturyventures.com',
'fabrice@fjlabs.com',
'simeon@noemisventures.com',
'jwerner@linkventures.com',
'nimi@boxgroup.com',
'doug@vastvc.com',
'mpatridge@cvequity.com',
'walter@kortschak.com',
'peter@4dxventures.com',
'jordan@cofoundpartners.com',
'jrotman@aquiline-llc.com',
'melissa@1863ventures.net',
'gw@momentum6.com',
'ya@kingswaycap.com',
'jenny@thefund.vc',
'talc@peregrinevc.com',
'steve@avantaventures.com',
'ash@accomplice.co',
'lquigley@salesforce.com',
'gina@blockstack.com',
'jason@lightstonevc.com',
'tom@sequelvc.com',
'hem@sparkgv.com',
'niradler@somv.com',
'axel.krieger@dplus.partners',
'jordan@pacecapital.com',
'joe@sputnikatx.com',
'gillian.hunter@scotiabank.com',
'amy@hemi.vc',
'mark@telstraventures.com',
'brian@mvpartners.com',
'joe@lererhippeau.com',
'nakul@audacious.co',
'alex@bp.socialcapital.com',
'reed@groovecap.com',
'rob@autismimpact.fund',
'keith@kbpartners.com',
'david@goodgrowthvc.com',
'garry@makersfund.com',
'chrisk@newcropcapital.com',
'gayle@wocstar.com',
'bocampo@onblueprint.com',
'haven@mhubchicago.com',
'vikas@softbank.com',
'david@b37.vc',
'farsht@corazoncap.com',
'derek@watertowerventures.com',
'amoseley@noro-moseley.com',
'halak@domainvc.com',
'veronica.li@consensys.net',
'natty@matchstickventures.com',
'brees@startupcv.com',
'keith@shv.com',
'tmcneight@techoperators.com',
'jbouten@innovamemphis.com',
'mark@inspiredcapital.com'
];

const SESSION_KEY = 'rxinvestor_auth';

function isAllowedEmail(email: string) {
  return ALLOWED_EMAILS.includes(email.trim().toLowerCase());
}

// ─── Animation helpers ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
  { number: '15,000+', desc: 'Recruiters onboarded' },
  { number: '£750k+', desc: 'Active placement fees' },
  { number: '240+', desc: 'Live matches created' },
  { number: '178', desc: 'Countries represented' },
  { number: '< 6 weeks', desc: 'To reach scale' },
];

const problemCards = [
  {
    title: 'Recruiters already collaborate',
    items: [
      'Informal splits happen constantly',
      'Via WhatsApp, email, personal networks',
      'Manual, untracked, and unenforceable',
      'Cannot scale beyond personal relationships',
    ],
    color: 'cyan' as const,
  },
  {
    title: 'No platform exists for this',
    items: [
      "ATS / CRM tools don't facilitate collaboration",
      'Job boards serve clients, not recruiters',
      'AI tools replace recruiters, not coordinate them',
      'No neutral trust layer for cross-agency splits',
    ],
    color: 'fuchsia' as const,
  },
];

const steps = [
  {
    num: 1,
    title: 'Get Verified',
    body: 'Identity confirmed via LinkedIn and Stripe Identity. Trust is established before access is granted.',
  },
  {
    num: 2,
    title: 'Share',
    body: 'Recruiters add live roles and warm candidates to the Xchange Engine. Everything is consent-based and private until terms are agreed.',
  },
  {
    num: 3,
    title: 'Match',
    body: 'AI matches candidates to roles across the network without exposing CVs or client names.',
  },
  {
    num: 4,
    title: 'Agree Terms',
    body: 'A Split Fee Agreement is signed before any data is shared. It states the split, the fee, and the payment date.',
  },
  {
    num: 5,
    title: 'Place & Compound',
    body: 'Placements are made, outcomes recorded, and reputation builds. Warm candidates no longer go cold. They compound across the network.',
  },
];

const traction = [
  {
    title: 'Network growth',
    items: [
      '15,000+ recruiters onboarded',
      'Across 178 countries',
      '~12% daily active users',
      'Organic growth, no paid acquisition at scale',
    ],
    color: 'cyan' as const,
  },
  {
    title: 'Platform activity',
    items: [
      '240+ live recruiter-to-recruiter matches',
      '£750k+ in active placement fees inside the network',
      '£140k in split fees on public roles',
      '£1.2M+ projected throughput for Q1 2025',
    ],
    color: 'purple' as const,
  },
];

const marketCards = [
  { num: '$600B+', label: 'Global recruitment market (Staffing Industry Analysts)' },
  { num: '2-3M+', label: 'Independent & freelance recruiters globally' },
  { num: '$50B+', label: 'Addressable split-fee & collaborative hiring infrastructure' },
  { num: '~8-10%', label: 'Of global recruitment fees in collaborative/split-fee activity' },
];

const askItems = [
  {
    amount: '£400k',
    purpose: 'Global Core: platform engineering, trust architecture, mobile apps, compliance and GTM',
    color: 'cyan' as const,
  },
  {
    amount: '£400k',
    purpose: 'RecX Direct city hubs (US and Europe): enterprise role acquisition, no recruiter payroll',
    color: 'purple' as const,
  },
  {
    amount: '£200k',
    purpose: 'Marketing: recruiter density, enterprise demand generation, brand and distribution',
    color: 'fuchsia' as const,
  },
];

const teamMembers = [
  {
    name: 'Tom Andrews',
    role: 'CEO & Co-Founder',
    items: [
      '14+ years in agency & enterprise recruitment',
      'Ex Reed, HSBC',
      'Originated RecXchange from first-hand yield loss',
      'Leads growth, brand, and enterprise demand',
    ],
    color: 'cyan' as const,
  },
  {
    name: 'James Brown',
    role: 'CTO & Co-Founder',
    items: [
      'Designed and built RecXchange in under 6 months',
      'Scaled previous business from £1M → £5M revenue',
      'Sole architect, developer, and product owner',
      'Owns platform reliability and trust architecture',
    ],
    color: 'purple' as const,
  },
  {
    name: 'Lucinda Reader',
    role: 'Head of RecX Direct',
    items: [
      'Senior HR & recruitment leadership',
      'Ex Harrods, Metro Bank, KPMG',
      'Expert in regulated, high-trust hiring systems',
      'Leads enterprise client relationships',
    ],
    color: 'fuchsia' as const,
  },
];

// ─── Color helper ────────────────────────────────────────────────────────────

const glowColors = {
  cyan:    { border: 'border-cyan-400/40',    text: 'text-cyan-300',    bg: 'bg-cyan-400/10',    num: 'text-cyan-300'    },
  purple:  { border: 'border-purple-400/40',  text: 'text-purple-300',  bg: 'bg-purple-400/10',  num: 'text-purple-300'  },
  fuchsia: { border: 'border-fuchsia-400/40', text: 'text-fuchsia-300', bg: 'bg-fuchsia-400/10', num: 'text-fuchsia-300' },
  emerald: { border: 'border-emerald-400/40', text: 'text-emerald-300', bg: 'bg-emerald-400/10', num: 'text-emerald-300' },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-[0.25em] uppercase text-cyan-400 mb-3">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-5 leading-tight tracking-tight">
      {children}
    </h2>
  );
}

function AccentText({ children }: { children: React.ReactNode }) {
  return <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">{children}</span>;
}

function YieldPill({
  label,
  highlight = false,
  tooltip,
}: {
  label: string;
  highlight?: boolean;
  tooltip?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close on outside click (mobile)
  const handleOutside = useCallback((e: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleOutside);
      document.addEventListener('touchstart', handleOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [open, handleOutside]);

  return (
    <span
      ref={ref}
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border ${
        highlight
          ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-300'
          : 'bg-white/5 border-white/15 text-gray-400'
      }`}
    >
      {label}

      {tooltip && (
        <span className="group/tip relative inline-flex items-center">
          {/* ? button */}
          <button
            type="button"
            aria-label={`Info: ${label}`}
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-black leading-none border transition-colors cursor-pointer select-none
              ${
                highlight
                  ? 'border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20'
                  : 'border-white/20 text-gray-500 hover:border-white/40 hover:text-gray-300'
              }`}
          >
            ?
          </button>

          {/* Desktop hover tooltip */}
          <span
            className="pointer-events-none hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 px-3 py-2 rounded-lg text-xs text-gray-200 leading-relaxed
              opacity-0 group-hover/tip:opacity-100 transition-opacity duration-200 z-50"
            style={{
              background: 'rgba(10,10,20,0.96)',
              border: '1px solid rgba(0,240,255,0.25)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,240,255,0.08)',
            }}
            role="tooltip"
          >
            {tooltip}
            {/* Arrow */}
            <span
              className="absolute top-full left-1/2 -translate-x-1/2 -mt-px"
              style={{
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid rgba(0,240,255,0.25)',
              }}
            />
          </span>

          {/* Mobile tap tooltip */}
          {open && (
            <span
              className="sm:hidden absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 px-3 py-2 rounded-lg text-xs text-gray-200 leading-relaxed z-50"
              style={{
                background: 'rgba(10,10,20,0.98)',
                border: '1px solid rgba(0,240,255,0.3)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,240,255,0.1)',
              }}
              role="tooltip"
            >
              {tooltip}
              <span
                className="absolute top-full left-1/2 -translate-x-1/2 -mt-px"
                style={{
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '5px solid rgba(0,240,255,0.3)',
                }}
              />
            </span>
          )}
        </span>
      )}
    </span>
  );
}

function YieldArrow() {
  return <span className="text-gray-600 text-lg font-bold">→</span>;
}

// ─── Main page ───────────────────────────────────────────────────────────────

// ─── Request Access form ─────────────────────────────────────────────────────

function RequestAccessForm({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/investor-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, businessName, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  const inputClass =
    'w-full bg-white/[0.04] border border-white/[0.12] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.06] transition-colors';

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <div
          className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: 'rgba(0,240,255,0.15)', border: '1px solid rgba(0,240,255,0.4)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-white font-bold text-base mb-1">Request sent</p>
        <p className="text-gray-400 text-sm mb-5">We will be in touch shortly.</p>
        <button onClick={onBack} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2">
          Back to login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Full name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Smith"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Business name</label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Acme Capital"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@acmecapital.com"
          required
          className={inputClass}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-xs">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 rounded-lg text-sm font-black tracking-wider text-black transition-opacity disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #00f0ff, #a855f7)' }}
      >
        {status === 'loading' ? 'Sending...' : 'Request Access'}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full text-xs text-gray-500 hover:text-gray-300 transition-colors pt-1"
      >
        Back to login
      </button>
    </form>
  );
}

// ─── Login modal ──────────────────────────────────────────────────────────────

function LoginModal({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [error, setError]         = useState('');
  const [view, setView]           = useState<'login' | 'request'>('login');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!isAllowedEmail(email)) {
      setError('This email is not on the access list. Request access below.');
      return;
    }
    if (password !== INVESTOR_PASSWORD) {
      setError('Incorrect password.');
      return;
    }
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
    onSuccess();
  }

  const inputClass =
    'w-full bg-white/[0.04] border border-white/[0.12] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.06] transition-colors';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: 'rgba(5,5,8,0.92)', backdropFilter: 'blur(16px)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(17,24,39,0.98)',
          border: '1px solid rgba(0,240,255,0.2)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,240,255,0.06)',
        }}
      >
        {/* Header */}
        <div
          className="px-7 pt-7 pb-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(0,240,255,0.12)', border: '1px solid rgba(0,240,255,0.3)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">Investor Portal</p>
              <p className="text-xs text-gray-500">RecXchange Seed Round</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {view === 'login' ? (
              <motion.p
                key="login-title"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-lg font-black text-white"
              >
                Authorised access only
              </motion.p>
            ) : (
              <motion.p
                key="request-title"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-lg font-black text-white"
              >
                Request access
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          <AnimatePresence mode="wait">
            {view === 'login' ? (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(''); }}
                      placeholder="Enter password"
                      required
                      autoComplete="current-password"
                      className={`${inputClass} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      aria-label={showPw ? 'Hide password' : 'Show password'}
                    >
                      {showPw ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs leading-relaxed"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-sm font-black tracking-wider text-black transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #00f0ff, #a855f7)' }}
                >
                  Access Investor Overview
                </button>

                <p className="text-center text-xs text-gray-600 pt-1">
                  Not on the list?{' '}
                  <button
                    type="button"
                    onClick={() => { setView('request'); setError(''); }}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2"
                  >
                    Request access
                  </button>
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="request-form"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <RequestAccessForm onBack={() => setView('login')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div
          className="px-7 pb-5 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p className="text-[10px] text-gray-700 pt-4">
            This document is confidential. Unauthorised distribution is prohibited.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function InvestorOnePager() {
  const [authed, setAuthed] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') setAuthed(true);
    } catch {}
  }, []);

  return (
    <>
      <AnimatePresence>
        {!authed && <LoginModal onSuccess={() => setAuthed(true)} />}
      </AnimatePresence>

      <main className="relative bg-[#050508] min-h-screen overflow-hidden" aria-hidden={!authed}>
      <FuturisticBackground variant="default" />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-20 sm:pt-28 md:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 text-center border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <StatusBadge label="Seed Round · Investor Overview" color="cyan" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2rem,6vw,4rem)] font-black text-white leading-[1.1] tracking-tight mb-6"
          >
            The <AccentText>trust layer</AccentText> for
            <br className="hidden sm:block" /> global recruiter collaboration.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto mb-8"
          >
            RecXchange is the operating system for recruiter-to-recruiter split-fee collaboration.
            Live. Growing. Revenue inside the network from day one.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-black text-sm sm:text-base tracking-widest uppercase"
            style={{
              background: 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(168,85,247,0.15))',
              border: '1px solid rgba(0,240,255,0.4)',
              boxShadow: '0 0 40px rgba(0,240,255,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
              color: '#00f0ff',
            }}
          >
            £1M · 8% Equity · 24-Month Runway
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-8 border-b border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.desc}
                variants={fadeUp}
                custom={i}
                className="text-center px-2"
              >
                <div
                  className="text-2xl sm:text-3xl font-black mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {s.number}
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                  {s.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>The Problem</SectionLabel>
              <SectionHeading>
                Recruitment isn't demand constrained.
                <br />
                <AccentText>It's yield constrained.</AccentText>
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                A recruiter puts ten screened candidates forward for a role. One gets hired. Nine go cold, still valuable and still warm, but trapped inside one agency's system.
              </p>
            </motion.div>

            {/* Yield flow */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-4">
              <YieldPill label="20 outreach" tooltip="Candidates approached by the recruiter, or who applied directly for the role." />
              <YieldArrow />
              <YieldPill label="10 screened" tooltip="Candidates who passed initial screening calls, qualified against the role's key criteria." />
              <YieldArrow />
              <YieldPill label="5 submitted" tooltip="Shortlisted CVs formally submitted to the hiring client for review." />
              <YieldArrow />
              <YieldPill label="1 hired" tooltip="The single candidate who receives and accepts the job offer." />
              <YieldArrow />
              <YieldPill label="9 wasted" highlight tooltip="The remaining 9 screened, qualified candidates. Still warm, still valuable, but siloed inside one agency's system with nowhere to go." />
            </motion.div>

            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-lg font-black text-red-400 tracking-wide">YIELD: 1 of 10</span>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {problemCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className={`rounded-xl border p-6 ${glowColors[card.color].border}`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${glowColors[card.color].text}`}>
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          card.color === 'cyan' ? 'bg-cyan-400' : 'bg-fuchsia-400'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── SOLUTION ────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>The Solution</SectionLabel>
              <SectionHeading>
                The missing trust layer.
                <br />
                <AccentText>Now live.</AccentText>
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                RecXchange is the neutral operating system that lets recruiters safely share roles and warm candidates, agree structured split-fee terms, and place together, with identity verified, ownership recorded, and payment terms agreed before any data is shared.
              </p>
            </motion.div>

            {/* Solution yield flow */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-4">
              <YieldPill label="9 warm candidates" tooltip="The 9 qualified candidates from the problem flow. Already screened and ready, just without a matching role at their original agency." />
              <YieldArrow />
              <YieldPill label="Xchange Engine" highlight tooltip="RecXchange's AI matching layer. Anonymously maps candidates to live roles across the network without exposing CVs or client names until terms are agreed." />
              <YieldArrow />
              <YieldPill label="AI match to 9 roles" tooltip="Each warm candidate is matched to a live role held by a different recruiter in the network, creating 9 new potential placements from candidates that would otherwise go cold." />
              <YieldArrow />
              <YieldPill label="Split fee agreed" tooltip="A legally binding Split Fee Agreement is signed by both recruiters before any candidate data or client details are shared, protecting both parties." />
              <YieldArrow />
              <YieldPill label="9 placements" highlight tooltip="Every qualified candidate finds a placement. The original recruiter earns a split fee on each, turning 9 wasted outcomes into 9 revenue events." />
            </motion.div>

            <motion.div variants={fadeUp} className="mb-10">
              <span className="text-lg font-black text-cyan-400 tracking-wide">YIELD: 10 of 10</span>
            </motion.div>

            {/* Steps */}
            <motion.div variants={stagger} className="space-y-4 mt-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  custom={i}
                  className="flex gap-4 items-start p-4 rounded-xl border border-white/[0.06] hover:border-cyan-400/20 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-black"
                    style={{
                      background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
                      boxShadow: '0 0 16px rgba(0,240,255,0.3)',
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-400">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── TRACTION ────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Traction</SectionLabel>
              <SectionHeading>
                Live network. <AccentText>Real economic throughput.</AccentText>
                <br />First 6 weeks.
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                RecXchange went live in November 2024. Recruitment cycles typically complete in ~90 days, so the platform is still inside its first full placement cycle.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {traction.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  className={`rounded-xl border p-6 ${glowColors[card.color].border}`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${glowColors[card.color].text}`}>
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          card.color === 'cyan' ? 'bg-cyan-400' : 'bg-purple-400'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Quote block */}
            <motion.div
              variants={fadeUp}
              className="rounded-xl border border-cyan-400/20 p-5"
              style={{ background: 'rgba(0,240,255,0.04)' }}
            >
              <p className="text-white italic text-base mb-2">
                "5 matched candidates submitted to a live role in under 30 minutes."
              </p>
              <p className="text-gray-500 text-xs">Real outcome on the live platform.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* ── BUSINESS MODEL ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Business Model</SectionLabel>
              <SectionHeading>
                Revenue scales with placements,
                <br />
                <AccentText>not headcount.</AccentText>
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                RecXchange earns a share of every successful placement. RecX Direct aggregates enterprise hiring mandates and fulfils them through the independent recruiter network, with no recruited payroll.
              </p>
            </motion.div>

            {/* Hub economics table */}
            <motion.div variants={fadeUp} className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {['One City Hub: Inputs', 'Annual Financials', 'Structure'].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[11px] font-bold uppercase tracking-widest text-cyan-400 px-4 py-3 border-b border-white/[0.08]"
                        style={{ background: 'rgba(0,240,255,0.04)' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      input: '~100 enterprise roles/month',
                      finance: { big: '$2.4M', sub: 'Annual placement value' },
                      structure: 'No recruiter salaries',
                    },
                    {
                      input: 'Avg placement fee: ~$10k',
                      finance: { big: '$1M+', sub: 'Net to RecXchange per hub' },
                      structure: 'No local agency build-out',
                    },
                    {
                      input: '~$2k coordination fee per role',
                      finance: { big: 'N/A', sub: '' },
                      structure: 'Delivery risk distributed across the network',
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-400">{row.input}</td>
                      <td className="px-4 py-3">
                        {row.finance.big !== 'N/A' ? (
                          <>
                            <span
                              className="text-xl font-black"
                              style={{
                                background: 'linear-gradient(135deg, #00f0ff, #a855f7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              {row.finance.big}
                            </span>
                            <br />
                            <span className="text-[11px] text-gray-500">{row.finance.sub}</span>
                          </>
                        ) : (
                          <span className="text-gray-600">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-400">{row.structure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-5 text-gray-500 text-xs">
              2 city hubs planned for Phase 1: US · Europe. Asia & MENA in Phase 2. Subscriptions and tokens add upside but are not required for profitability.
            </motion.p>
          </motion.div>
        </section>

        {/* ── MARKET OPPORTUNITY ──────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Market Opportunity</SectionLabel>
              <SectionHeading>
                A $600B market.
                <br />
                <AccentText>With no infrastructure layer.</AccentText>
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                Independent and freelance recruiters generate a significant share of global placement fees, but have no shared operating system. RecXchange is building that infrastructure.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketCards.map((card, i) => (
                <motion.div
                  key={card.num}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-xl border border-white/[0.08] p-5 hover:border-cyan-400/20 transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderTop: '2px solid rgba(0,240,255,0.4)',
                  }}
                >
                  <div
                    className="text-2xl sm:text-3xl font-black mb-2 text-white"
                  >
                    {card.num}
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed">{card.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── THE ASK ─────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-white/[0.06]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>The Ask</SectionLabel>
              <SectionHeading>
                <AccentText>£1M for 8%.</AccentText>
                <br />
                24-month runway to scale global infrastructure.
              </SectionHeading>
              <p className="text-gray-400 mb-8 max-w-2xl">
                Capital scales execution, not experimentation. The platform is live. The model is proven at unit level. This round funds scale.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              {askItems.map((item, i) => (
                <motion.div
                  key={item.amount}
                  variants={fadeUp}
                  custom={i}
                  className={`rounded-xl border p-5 ${glowColors[item.color].border}`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div
                    className={`text-xl font-black mb-2 ${glowColors[item.color].text}`}
                    style={{ textShadow: `0 0 20px currentColor` }}
                  >
                    {item.amount}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.purpose}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-xl border border-white/[0.08] p-5"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <p className="text-gray-400 text-sm">
                Total burn:{' '}
                <strong className="text-white">£500k/year</strong>
                {' '}· 24-month runway · Revenue from placements from month one of each hub.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ── TEAM ────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>The Team</SectionLabel>
              <SectionHeading>
                Built by people who <AccentText>lived the problem.</AccentText>
              </SectionHeading>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  custom={i}
                  className={`rounded-xl border p-6 ${glowColors[member.color].border}`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="text-base font-black text-white mb-1">{member.name}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-[0.18em] mb-4 ${glowColors[member.color].text}`}>
                    {member.role}
                  </div>
                  <ul className="space-y-2">
                    {member.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
                        <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          member.color === 'cyan' ? 'bg-cyan-400' :
                          member.color === 'purple' ? 'bg-purple-400' : 'bg-fuchsia-400'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

      </div>{/* /max-w-4xl */}

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 text-center"
        style={{
          background: 'linear-gradient(180deg, rgba(0,240,255,0.04) 0%, rgba(168,85,247,0.04) 100%)',
          borderTop: '1px solid rgba(0,240,255,0.2)',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Interested in the round?
            </h2>
            <NeonDivider width="w-24" color="mixed" />
            <p className="text-gray-400 mt-5 mb-8 max-w-md mx-auto text-sm sm:text-base">
              We&apos;re raising £1M Seed at 8% equity. The platform is live, the network is growing, and economic throughput is already inside the system.
            </p>
            <GlowButton href="mailto:invest@recxchange.io" variant="primary" size="lg">
              Request the Full Deck →
            </GlowButton>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER DISCLAIMER ───────────────────────────────────────────────── */}
      <footer className="relative z-10 py-6 px-4 text-center border-t border-white/[0.06]">
        <p className="text-[11px] text-gray-600 max-w-2xl mx-auto">
          © 2025 RecXchange Ltd. · All traction figures reflect live platform data as of December 2024 to January 2025.
          Forward projections are estimates and not guarantees of future performance.
          This document is for information purposes only and does not constitute a financial promotion.
        </p>
      </footer>
      </main>
    </>
  );
}
