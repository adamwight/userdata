SRCS=\
	gm.js \
	colorbox.js \
	us.js

assemble: $(SRCS)
	cat $(SRCS) > build/userdata.js
