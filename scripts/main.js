//Pink from BetaMindy
let cols = [Pal.lancerLaser, Pal.accent, Color.valueOf( "cc6eaf" )];

function addTable( table )
{
	table.table( Tex.pane, table =>
	{
		let slider = new Slider( -8, 8, 1, false );
		slider.setValue( 0 );
		let label = table.label( () =>
		                         {
			                         let v = slider.getValue();
			                         if ( v >= 0 )
			                         {
				                         return "x" + Math.pow( 2, v );
			                         }
			                         else
			                         {
				                         return "x1/" + Math.pow( 2, Math.abs( v ) );
			                         }
		                         } ).growX().width( 8.5 * 8 ).color( Pal.accent );

		let button = table.button( new TextureRegionDrawable( Icon.refresh ), 24, () => slider.setValue( 0 ) )
		                  .padLeft( 6 )
		                  .get();

		button.getStyle().imageUpColor = Pal.accent;

		table.add( slider ).padLeft( 6 ).minWidth( 200 );

		slider.moved( v =>
		              {
			              let scale = Math.pow( 2, v );
			              Time.setDeltaProvider( () => Math.min( Core.graphics.getDeltaTime() * 60 * scale,
			                                                     3 * scale ) );
			              label.color( Tmp.c1.lerp( cols, ( slider.getValue() + 8 ) / 16 ) );
		              } );
	} );

	table.visibility = () =>
	{
		if ( !Vars.ui.hudfrag.shown || Vars.ui.minimapfrag.shown() )
		{
			return false;
		}
		if ( !Vars.mobile )
		{
			return true;
		}

		let input = Vars.control.input;
		return input.lastSchematic == null || input.selectPlans.isEmpty();
	};
}

if ( !Vars.headless )
{
	var tc = new Table();

	Events.on( ClientLoadEvent, () =>
	{
		tc.bottom().left();
		addTable( tc );
		Vars.ui.hudGroup.addChild( tc );
		if ( Vars.mobile )
		{
			tc.moveBy( 0, Scl.scl( 46 ) );
		}
	} );
}
