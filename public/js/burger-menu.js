// Collapse Sidebar Menu

$(document).ready(function(){
		$('#sidebarToggleTop').on('click', function () {
				$(this).toggleClass('close-menu');
				$('#side-menu').toggleClass('active');
				$('.content').toggleClass('active');
		});
});

// Toggle Responsive Menu
