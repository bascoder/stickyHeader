var initStickyHeaders = function () {
    var tables = jQuery('table.stickyHeader');
    tables.each(function(i){
        var table = tables[i];
        var tableClone = jQuery(table).clone(true).empty().removeClass('stickyHeader');
        var theadClone = jQuery(table).find('thead').clone(true);
        var stickyHeader =  jQuery('<div></div>').addClass('stickyHeader hide').attr('aria-hidden', 'true');
        stickyHeader.append(tableClone).find('table').append(theadClone);
        jQuery(table).after(stickyHeader);

        var tableHeight = jQuery(table).height();
        var tableWidth = jQuery(table).width()
            + Number(jQuery(table).css('padding-left').replace(/px/ig, ""))
            + Number(jQuery(table).css('padding-right').replace(/px/ig, ""))
            + Number(jQuery(table).css('border-left-width').replace(/px/ig, ""))
            + Number(jQuery(table).css('border-right-width').replace(/px/ig, ""));

        var headerCells = jQuery(table).find('thead th');
        var headerCellHeight = jQuery(headerCells[0]).height();

        var no_fixed_support = false;
        if (stickyHeader.css('position') == "absolute") {
            no_fixed_support = true;
        }

        var stickyHeaderCells = stickyHeader.find('th');
        stickyHeader.css('width', tableWidth);
        var cellWidths = [];
        for (var i = 0, l = headerCells.length; i < l; i++) {
            cellWidths[i] = jQuery(headerCells[i]).width();
        }
        for (var i = 0, l = headerCells.length; i < l; i++) {
            jQuery(stickyHeaderCells[i]).css('width', cellWidths[i]);
        }

        var cutoffTop = jQuery(table).offset().top;
        var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;

        jQuery(window).scroll(function() {
            var currentPosition = jQuery(window).scrollTop();
            if (currentPosition > cutoffTop && currentPosition < cutoffBottom) {
                stickyHeader.removeClass('hide');
                if (no_fixed_support) {
                    stickyHeader.css('top', currentPosition + 'px');
                }
            }
            else {
                stickyHeader.addClass('hide');
            }
        });

        // init sticky headers again on resize
        jQuery(window).on('resize', reInitStickyHeaders);
    });
};

function reInitStickyHeaders() {
    // remove old sticky header
    jQuery('div.stickyHeader').remove();
    // unbind scroll and resize handlers
    jQuery(window).off('scroll');
    jQuery(window).off('resize');
    // run initStickyHeaders again
    initStickyHeaders();
}

// init sticky headers on dom load
jQuery(document).ready(initStickyHeaders);
