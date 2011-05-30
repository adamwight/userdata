function hook_all_forms()
{
  $("form").each(function () {
    $(this).submit(function () {
      // XXX this is getting one form data rev back
    //XXX do the match on attachment so we can annotate the submit button
      if (match_form($(this))) {
	var o = {};
	$.each( $(this).serializeArray(), function( i,e ) {
	  o[e.name] = e.value;
	}); 
	userdata_store(JSON.stringify(o));
      }
      return true;
    });
  });
  $(":submit").after('++');
}

function configure_dialog()
{
  inject_css(colorbox_css);
  $.colorbox({title: "XXXXX", html: "<h2>XX Config</h2>\
\
    <h3>User history</h3>" +
user_history() +
"<h3>Actions</h3>\
<a href='#'>[+] Set sharing preferences</a> | \
<a href='#'>[+] Backup personal data</a> | \
<a href='#'>[+] Configure sites</a> | \
<a href='#'>[+] </a> \
" });
}

function user_history()
{
  var seq_start = save_data("seq-begin");
  var seq_end = load_data("seq-end");
  if (!seq_start) return "<i>No data stored</i>";
  var data_html = "<ol>";
  for (var i = seq_start; i <= seq_end; i++) {
    data_html += "<li>" + print_r(JSON.parse(load_value("userdata-" + i))) + "</li>";
  }
  return data_html + "</ol>";
}

function print_r(obj){
   var result = '<ul>';
   for(var key in obj){
       result += '<li>';
       if (typeof obj[key] == 'object'){
	   result += print_r(obj[key]);
       } else {
           result += (key + '=' + obj[key]);
       }
       result += '</li>';
   }
   return result + '</ul>';
}

function userdata_store(data)
{
  var seq_end = load_data("seq-end");
  if (!seq_end) {
    save_data("seq-begin", 1);
    seq_end = 0;
  }
  seq_end++;
  save_data("seq-end", seq_end);
  save_data("userdata-" + seq_end, data);
    //url: $(location).attr("href"),
    //date:
}

//function remote_store

//function setup_match_rules
//{
//  rules = get()
//  cache_hash(rules)

matchRulez = [
  //{ "group"
  {
    url_re: /post.*php/,
    match: function() {
	//return $("wpcontent") ? true : false;
    },
    form_id: "post",
    reconstruct: function(obj) {
	//return $.map(obj, 
    },
    //form_sel: "#$ C2 A"
    //form_action: "postit.php"
    //
  },
];

function match_form(form)
{
  var current_url = $(location).attr("href");

  //for (var rule in matchRulez)
  for (var i = 0; i < matchRulez.length; i++)
  {
    rule = matchRulez[i];
    if (!current_url.match(rule.url_re))
      continue;
    if (form.is("#" + rule.form_id))
      return true;
    //if ($(rule.form_sel) first == form)
  }
}

hook_all_forms();
register_menus();
