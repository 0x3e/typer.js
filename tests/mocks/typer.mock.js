typer=function()
{
  this.display={menu:'menu_display_area',level:'level_display_area',score:'score_display_area'}
  this.words_database={}
  this.words_database={
    get_selected_words:function(){return 'a'}
   ,get_selected_url:function(){return 'url'}
  }
  this.keys={
    meta:function(){return false}
    ,equivalent:function(){return true}
  }
}
