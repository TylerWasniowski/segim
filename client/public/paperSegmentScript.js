const raster = new Raster("selected-image");

const originalSize = raster.size;

// Resize image to fit canvas
const aspectRatio = raster.size.width / raster.size.height;
raster.size = new Size(aspectRatio * view.size.height, view.size.height);
raster.position = view.center;

console.log(`Aspect ratio: ${aspectRatio}`);
console.log(`Size before resizing: ${originalSize}`);
console.log(`Size after resizing: ${raster.size}`);

const textItem = new PointText({
  content: "(0, 0)",
  point: new Point(0, 30),
  fillColor: "black"
});

let path;

let finishedPaths = [[[307.0404312668464,201.50772085777126],[314.544474393531,174.02384989002934],[323.29919137466305,159.03264754398828],[344.56064690026955,139.04437774926686],[355.8167115902965,144.0414451979472],[363.3207547169811,134.0473103005865],[378.3288409703504,129.05024285190615],[390.8355795148248,129.05024285190615],[410.8463611859838,135.2965771627566],[417.099730458221,142.79217833577712],[417.099730458221,151.53704637096774],[417.099730458221,159.03264754398828],[414.59838274932616,170.27604930351907],[415.8490566037736,184.01798478739002],[407.0943396226415,201.50772085777126],[414.59838274932616,207.7540551686217],[400.8409703504043,223.99452437683286],[384.5822102425876,235.23792613636363],[387.0835579514825,245.23206103372434],[378.3288409703504,248.9798616202346],[360.8194070080863,241.48426044721407],[348.3126684636119,236.48719299853371],[334.55525606469,231.49012554985336],[327.0512129380054,223.99452437683286],[309.54177897574124,211.50185575513197]],[[425.8544474393531,170.27604930351907],[428.355795148248,161.53118126832845],[426.6361185983827,147.47692906891496],[421.633423180593,158.72033082844575]],[[390.366576819407,123.74085868768329],[419.1320754716981,117.49452437683284],[416.63072776280325,107.50038947947215],[415.3800539083558,95.00772085777126],[414.12938005390833,88.76138654692082],[409.1266846361186,98.75552144428153],[404.12398921832886,101.2540551686217],[394.1185983827493,109.99892320381231],[394.1185983827493,103.75258889296188],[399.1212938005391,96.25698771994135],[405.3746630727763,87.51211968475073],[406.6253369272237,78.76725164956012],[409.1266846361186,70.0223836143695],[409.1266846361186,60.0282487170088],[402.8733153638814,55.031181268328446],[395.36927223719675,61.27751557917889],[386.6145552560647,73.77018420087977],[381.33045058751685,79.2044931450897],[383.8317982964117,81.70302686942988],[375.07708131527966,87.9493611802803],[363.8210166252527,89.1986280424504],[363.8210166252527,95.44496235330084],[371.3250597519373,97.94349607764102],[378.829102878622,97.94349607764102],[380.0797767330694,111.68543156151198],[381.33045058751685,115.43323214802224],[382.5811244419643,120.4302995967026]],[[377.5784290241745,59.21622811594317],[346.31158266298854,84.20156535934493],[332.5541702640667,89.19863280802528],[327.55147484627696,81.70303163500475],[337.5568656818565,76.70596418632441],[346.31158266298854,66.7118292889637],[355.06629964412065,62.96402870245343],[362.57034277080527,52.96989380509273],[368.82371204304246,51.72062694292264],[376.3277551697271,49.222093218582465],[377.5784290241745,52.96989380509273]],[[290.0312592128538,87.94936594585519],[287.5299115039589,99.19276770538599],[286.27923764951146,106.68836887840651],[276.2738468139319,101.69130142972617],[271.27115139614216,90.44789967019537],[271.27115139614216,79.20449791066457],[277.52452066837935,77.9552310484945],[281.2765422317217,79.20449791066457]],[[280.02586837727426,121.67957122444757],[275.0231729594845,130.42443925963818],[265.01778212390496,129.1751723974681],[261.2657605605627,120.43030436227748],[265.01778212390496,114.18397005142704]],[[383.8317982964117,335.3042094211075],[373.82640746083223,347.7968780428084],[361.31966891635784,342.799810594128],[347.56225651743597,349.04614490497846],[332.5541702640667,361.53881352667935],[305.03934546622304,371.53294842404006],[271.27115139614216,377.7792827348905],[255.01239128832546,380.2778164592307],[240.0043050349562,376.5300158727204],[206.23611096487534,382.77635018357086],[191.22802471150607,390.2719513565914],[163.7131999136624,392.77048508093156],[144.9530920969508,382.77635018357086],[139.95039667916106,366.5358809753597],[146.20376595139825,360.28954666450926],[147.45443980584568,354.0432123536588],[137.44904897026618,350.29541176714855],[123.69163657134433,350.29541176714855],[112.43557188131739,350.29541176714855],[98.67815948239556,347.7968780428084],[84.92074708347371,337.80274314544766],[79.91805166568396,320.3130070750664],[78.66737781123652,299.075470418175],[86.17142093792116,291.57986924515444],[94.92613791905323,292.82913610732453],[111.18489802686994,294.0784029694946],[116.1875934446597,279.08720062345355],[116.1875934446597,265.3452651395826],[127.44365813468666,257.84966396656205],[143.70241824250337,251.6033296557116],[167.46522147700472,254.10186338005178],[192.4786985659535,251.6033296557116],[217.4921756549023,262.8467314152424],[235.00160961716645,270.34233258826293],[251.26036972498315,269.09306572609285],[262.5164344150101,251.6033296557116],[271.27115139614216,225.36872555013974],[290.0312592128538,210.3775232040987],[306.29001932067047,211.6267900662688],[320.04743171959234,217.87312437711924],[340.05821339075135,237.86139417184063],[343.8102349540937,257.84966396656205],[351.3142780807783,267.84379886392276],[345.0609088085411,275.3394000369433],[342.5595610996462,282.8350012099638],[342.5595610996462,292.82913610732453],[342.5595610996462,304.07253786685527],[346.31158266298854,314.066672764216],[355.06629964412065,310.3188721777057],[365.0716904797001,291.57986924515444],[373.82640746083223,291.57986924515444],[381.33045058751685,297.8262035560049],[383.8317982964117,305.32180472902536],[387.58381985975404,311.5681390398758],[387.58381985975404,319.06374021289633],[387.58381985975404,324.0608076615767]],[[255.01239128832546,252.8525965178817],[255.01239128832546,260.3481976909022],[248.75902201608827,265.3452651395826],[238.75363118050876,265.3452651395826],[228.74824034492926,261.5974645530723],[229.99891419937669,254.10186338005178],[237.50295732606133,250.35406279354152],[245.00700045274596,251.6033296557116],[245.00700045274596,257.84966396656205]],[[107.43287646352763,150.41271381993448],[108.68355031797506,157.908314992955],[113.68624573576483,165.40391616597555],[119.93961500800202,169.15171675248578],[128.6943319891341,177.8965847876764],[124.94231042579177,187.8907196850371],[122.4409627168969,195.38632085805764],[111.18489802686994,197.88485458239782],[96.17681177350067,197.88485458239782],[87.4220947923686,192.88778713371747],[82.41939937457884,187.8907196850371],[83.67007322902629,181.64438537418667],[78.66737781123652,172.89951733899605],[78.66737781123652,161.65611557946528],[74.91535624789421,150.41271381993448],[78.66737781123652,145.41564637125413],[79.91805166568396,151.66198068210457],[82.41939937457884,160.4068487172952],[84.92074708347371,167.9024498903157],[89.92344250126348,166.65318302814563],[91.17411635571092,160.4068487172952],[86.17142093792116,154.16051440644475],[91.17411635571092,149.1634469577644],[97.42748562794812,151.66198068210457],[102.43018104573787,155.40978126861484]],[[87.4220947923686,240.3599278961808],[82.41939937457884,249.10479593137143],[87.4220947923686,256.60039710439196],[84.92074708347371,264.0959982774125],[77.41670395678908,262.8467314152424],[69.91266083010444,250.35406279354152],[71.16333468455188,240.3599278961808],[76.16603010234165,237.86139417184063],[81.1687255201314,235.36286044750045],[86.17142093792116,235.36286044750045],[88.67276864681604,236.61212730967054]],[[3.6269465443901616,159.15757708955022],[8.62964196217992,152.91124277869977],[3.6269465443901616,145.41564160567924]],[[154.95848293253033,240.3599278961808],[159.96117835032007,237.86139417184063],[157.4598306414252,230.3657929988201],[148.70511366029314,227.86725927447992],[144.9530920969508,234.11359358533036],[148.70511366029314,237.86139417184063]],[[401.34123225867586,337.80274314544766],[412.5972969487028,351.54467862931864],[418.85066622094,350.29541176714855],[418.85066622094,344.0490774562981],[417.5999923664926,339.05201000761775],[418.85066622094,335.3042094211075],[410.09594923980796,325.3100745237468],[406.3439276764656,330.30714197242713]],[[141.2010705336085,250.35405326239174],[138.6997228247136,241.60918522720112],[148.70511366029314,245.3569858137114],[153.70780907808287,247.85551953805157],[149.95578751474056,251.60332012456183]],[[326.30080099182953,80.4537582201692],[312.54338859290766,70.4596233228085],[306.29001932067047,62.96402214978797],[306.29001932067047,50.47135352808709],[312.54338859290766,42.97575235506656],[327.55147484627696,41.72648549289647],[335.0555179729616,44.22501921723665],[345.0609088085411,46.72355294157683],[357.5676473530155,49.222086665917004],[356.3169734985681,59.216221563277706]],[[224.99621878158692,224.1194528799253],[229.99891419937669,221.6209191555851],[232.50026190827157,217.87311856907485],[221.2441972182446,215.37458484473467],[218.74284950934972,221.6209191555851],[214.9908279460074,230.3657871907757],[216.52291105121293,237.42414314516128],[219.0242587601078,241.17194373167155],[227.7789757412399,243.67047745601172],[239.03504043126685,239.92267686950146],[247.78975741239893,236.1748762829912],[252.79245283018867,228.67927510997066],[247.78975741239893,224.93147452346042],[239.03504043126685,223.68220766129033],[234.03234501347708,227.4300082478006],[229.02964959568735,229.92854197214075]],[[8.62964196217992,349.0461390969341],[13.632337379969677,351.5446728212743],[16.133685088864556,356.54174026995463],[13.632337379969677,361.5388077186349],[6.12829425328504,356.54174026995463]],[[1.0431654676258992,1.3886688232421875],[1.0431654676258992,64.87102176441866],[4.381294964028777,64.87102176441866],[9.388489208633093,64.87102176441866],[12.726618705035971,66.54160999971278],[24.41007194244604,66.54160999971278],[42.76978417266187,69.88278647030101],[61.1294964028777,81.57690411735983],[67.80575539568345,86.58866882324219],[71.14388489208633,94.94160999971278],[67.80575539568345,111.64749235265396],[64.46762589928058,120.00043352912454],[59.460431654676256,126.68278647030101],[54.45323741007194,131.69455117618335],[46.10791366906475,131.69455117618335],[42.76978417266187,136.70631588206572],[47.776978417266186,140.04749235265396],[54.45323741007194,150.07102176441865],[61.1294964028777,150.07102176441865],[69.4748201438849,143.3886688232422],[82.8273381294964,140.04749235265396],[104.5251798561151,140.04749235265396],[121.2158273381295,145.0592570585363],[129.5611510791367,146.72984529383044],[137.9064748201439,141.71808058794807],[146.25179856115108,141.71808058794807],[156.26618705035972,128.35337470559512],[166.28057553956833,120.00043352912454],[172.9568345323741,114.9886688232422],[182.97122302158274,113.31808058794807],[194.6546762589928,106.6357276467716],[208.0071942446043,108.30631588206572],[224.6978417266187,104.96513941147748],[241.3884892086331,109.97690411735984],[254.74100719424462,93.27102176441866],[266.42446043165467,79.90631588206571],[276.43884892086334,71.55337470559513],[289.7913669064748,66.54160999971278],[288.1223021582734,53.17690411735983],[294.7985611510791,49.8357276467716],[306.48201438848923,43.15337470559513],[321.50359712230215,38.14160999971278],[338.19424460431657,38.14160999971278],[348.2086330935252,48.16513941147748],[359.89208633093523,44.823962940889245],[364.8992805755396,36.47102176441866],[401.61870503597123,48.16513941147748],[409.9640287769784,53.17690411735983],[418.3093525179856,54.84749235265395],[416.64028776978415,64.87102176441866],[414.9712230215827,78.2357276467716],[416.64028776978415,91.60043352912454],[418.3093525179856,99.95337470559512],[428.32374100719426,108.30631588206572],[443.3453237410072,104.96513941147748],[458.36690647482015,101.62396294088924],[463.37410071942446,98.282786470301],[461.705035971223,1.3886688232421875]]]

const transformPointInverse = point => {
  const { x, y } = point;

  return new Point({
    x: (x * raster.size.width) / originalSize.width,
    y: (y * raster.size.height) / originalSize.height
  }) + raster.position - raster.size / 2;
}

finishedPaths.forEach(pathArr => {
  new Path({
    closed: true,
    segments: pathArr.map(point => new Point({ x: point[0], y: point[1] })).map(transformPointInverse),
    strokeColor: "black"
  })
});

// Transform point to correspond to (x, y) in original image
const transformPoint = point => {
  // Make (0, 0) the top left of the image
  const { x, y } = point - raster.position + raster.size / 2;

  return new Point({
    x: (x * originalSize.width) / raster.size.width,
    y: (y * originalSize.height) / raster.size.height
  });
};

raster.onMouseMove = event => {
  const { x, y } = transformPoint(event.point);

  textItem.content = `(${x}, ${y})`;
};

raster.onClick = event => {
  if (!path) {
    path = new Path({
      fullySelected: true,
      strokeColor: "black"
    });

    isCreatingRegion = true;
  }

  path.add(event.point);
};

tool.onKeyUp = event => {
  if (!path) return;

  if (event.key === "escape") {
    path.closed = true;
    path.fullySelected = false;

    const pathPoints = path.segments
      .map(
        segment =>
          new Point({
            x: segment.point.x,
            y: segment.point.y
          })
      )
      .map(transformPoint)
      .map(point => [point.x, point.y]);

    path = null;

    finishedPaths.push(pathPoints);
    console.log(JSON.stringify(finishedPaths));
  } else if (event.key === "backspace") {
    path.removeSegment(path.segments.length - 1);
  }
};
