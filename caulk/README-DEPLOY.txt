DEPLOYMENT INSTRUCTIONS
========================

1) caulk-V2.8.html
   -> Copy it, rename the copy to "index.html"
   -> Upload to:  /caulk/index.html

2) images/ folder (5 files)
   -> These go INSIDE the /caulk/ folder, in their own images subfolder
   -> Upload to:  /caulk/images/
   -> This matches the pattern already used for the pressure-treated-lumber
      page — each topic folder owns its own images subfolder.

Repo structure after upload should look like:

  GPPS-LPv2Cl/
    caulk/
      index.html                <- renamed from caulk-V2.8.html
      images/                   <- caulk-specific photos live here
        caulk-removal-before.png
        caulk-corner-after.png
        caulk-middle-after.png
        caulk-sloppy-extreme.jpg
        caulk-mold-corner.jpg
    images/                     <- shared site-wide assets only (logo, etc.)
    index.html                  <- homepage (untouched)

Note: the site logo (top-left header, footer) stays referenced from the
shared root-level /images/ folder since it's used on every page. Only
this page's own photos live in /caulk/images/.
