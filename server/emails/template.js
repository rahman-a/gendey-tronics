const template = {
    activate(info){
        return`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="format-detection" content="date=no" />
	<meta name="format-detection" content="address=no" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i" rel="stylesheet" />
    <!--<![endif]-->
	<title>Email Template</title>
	<!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->
	

	<style type="text/css" media="screen">
		/* Linked Styles */
		body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none }
		a { color:#66c7ff; text-decoration:none }
		p { padding:0 !important; margin:0 !important } 
		img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
		.mcnPreviewText { display: none !important; }
		.hero_bg {
			background-image: url('https://i.ibb.co/HCbMmHJ/img-3.png');
			margin:0;
			padding: 0;
		}
				
		/* Mobile styles */
		@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
			.mobile-shell { width: 100% !important; min-width: 100% !important; }
			.bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
			
			.text-header,
			.m-center { text-align: center !important; }
			
			.center { margin: 0 auto !important; }
			.container { padding: 20px 10px !important }
			
			.td { width: 100% !important; min-width: 100% !important; }

			.m-br-15 { height: 15px !important; }
			.p30-15 { padding: 30px 15px !important; }
			.p40 { padding: 20px !important; }

			.m-td,
			.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

			.m-block { display: block !important; }

			.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

			.column,
			.column-top,
			.column-empty,
			.column-empty2,
			.column-dir-top { float: left !important; width: 100% !important; display: block !important; }
			.column-empty { padding-bottom: 10px !important; }
			.column-empty2 { padding-bottom: 20px !important; }
			.content-spacing { width: 15px !important; }
		}
	</style>
</head>
<body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
		<tr>
			<td align="center" valign="top">
				<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
					<tr>
						<td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
							<!-- Header -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td style="padding-bottom: 20px;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td class="p30-15" style="padding: 25px 30px 25px 30px;" bgcolor="#ffffff">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<th class="column-top" width="145" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://i.ibb.co/gFfjfPy/gendy-logo.png" width="167" height="75" editable="true" border="0" alt="" /></td>
																	</tr>
																</table>
															</th>
															<th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
															<th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="text-header" style="color:#000; font-family:'Noto Sans', Arial,sans-serif; font-size:20px; line-height:16px; text-align:right; text-transform:uppercase;"><multiline><webversion class="link2" style="color:#000; font-weight: 900; text-decoration:none;">RESET PASSWORD</webversion></multiline></td>
																	</tr>
																</table>
															</th>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Header -->

							<repeater>
								<!-- Article / Title + Copy + Button -->
								<layout label='Article / Title + Copy + Button'>
									<table width="100%" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td style="padding-bottom: 20px;">
												<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
													<tr>
														<td class="p30-15" style="padding: 50px 30px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<!-- <tr>
																	<td class="h3 pb20" style="color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:24px; line-height:32px; text-align:left; padding-bottom:20px;"><multiline>Lorem ipsum dolor sit amet consecteur</multiline></td>
																</tr> -->
																<tr>
																	<td class="text pb20" style="color:#777777; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;">
																		<multiline>	
                                                                            <p>Hi ${info.name}</p>
                                                                            <p>We Are so happy to have you on board</p> 
                                                                            <p>A new account with your credential has created recently</p>
                                                                            <p>To confirm your account click the button below</p>
                                                                            <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
                                                                            <p>Thanks,</p>
																		</multiline>
																	</td>
																</tr>
																<!-- Button -->
																<tr>
																	<td align="left">
																		<table border="0" cellspacing="0" cellpadding="0" style="margin-bottom:1rem">
																			<tr>
																				<td class="text-button" style="background:#ffeb3b; color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 20px; text-align:center; border-radius:6px;"><multiline><a href="${info.link}" target="_blank" class="link-white" style="color:#363636; text-decoration:none;"><span class="link-white" style="color:#363636; text-decoration:none;">Confirm Account</span></a></multiline></td>
                                                                            </tr>
                                                                            
																		</table>
                                                                        
																	</td>
																</tr>
                                                                <tr>
                                                                    <td>
                                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="text-button" style="display: block; margin-bottom: 2rem; color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; text-align:left;">${info.link}</td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                
																<!-- END Button -->
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</layout>	
								<!-- END Article / Title + Copy + Button -->

							<!-- Footer -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td class="p30-15" style="padding: 50px 30px;" bgcolor="#ffffff">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td align="center" style="padding-bottom: 30px;">
													<table border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="https://www.facebook.com/aljazriacademy/" target="_blank"><img src="https://i.ibb.co/JdNYZVR/t8-ico-facebook.jpg" width="38" height="38" editable="true" border="0" alt="" /></a></td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td class="text-footer1 pb10" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;"><multiline>Elgendy Autotronics Center</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;"><multiline>Al Haram, Al Omraneyah Ash Sharqeyah, El Omraniya, Giza Governorate 11511</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30"
													style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;">
													<a style="color:#999999;" href="https://www.gendyecu.com" target="__blank">visit website</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Footer -->
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>

    `
},
reset(info){
    return`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="format-detection" content="date=no" />
	<meta name="format-detection" content="address=no" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i" rel="stylesheet" />
    <!--<![endif]-->
	<title>Email Template</title>
	<!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->
	

	<style type="text/css" media="screen">
		/* Linked Styles */
		body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none }
		a { color:#66c7ff; text-decoration:none }
		p { padding:0 !important; margin:0 !important } 
		img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
		.mcnPreviewText { display: none !important; }
		.hero_bg {
			background-image: url('https://i.ibb.co/HCbMmHJ/img-3.png');
			margin:0;
			padding: 0;
		}
				
		/* Mobile styles */
		@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
			.mobile-shell { width: 100% !important; min-width: 100% !important; }
			.bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
			
			.text-header,
			.m-center { text-align: center !important; }
			
			.center { margin: 0 auto !important; }
			.container { padding: 20px 10px !important }
			
			.td { width: 100% !important; min-width: 100% !important; }

			.m-br-15 { height: 15px !important; }
			.p30-15 { padding: 30px 15px !important; }
			.p40 { padding: 20px !important; }

			.m-td,
			.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

			.m-block { display: block !important; }

			.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

			.column,
			.column-top,
			.column-empty,
			.column-empty2,
			.column-dir-top { float: left !important; width: 100% !important; display: block !important; }
			.column-empty { padding-bottom: 10px !important; }
			.column-empty2 { padding-bottom: 20px !important; }
			.content-spacing { width: 15px !important; }
		}
	</style>
</head>
<body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
		<tr>
			<td align="center" valign="top">
				<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
					<tr>
						<td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
							<!-- Header -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td style="padding-bottom: 20px;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td class="p30-15" style="padding: 25px 30px 25px 30px;" bgcolor="#ffffff">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<th class="column-top" width="145" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://i.ibb.co/gFfjfPy/gendy-logo.png" width="167" height="75" editable="true" border="0" alt="" /></td>
																	</tr>
																</table>
															</th>
															<th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
															<th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="text-header" style="color:#000; font-family:'Noto Sans', Arial,sans-serif; font-size:20px; line-height:16px; text-align:right; text-transform:uppercase;"><multiline><webversion class="link2" style="color:#000; font-weight: 900; text-decoration:none;">RESET PASSWORD</webversion></multiline></td>
																	</tr>
																</table>
															</th>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Header -->

							<repeater>
								<!-- Article / Title + Copy + Button -->
								<layout label='Article / Title + Copy + Button'>
									<table width="100%" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td style="padding-bottom: 20px;">
												<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
													<tr>
														<td class="p30-15" style="padding: 50px 30px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<!-- <tr>
																	<td class="h3 pb20" style="color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:24px; line-height:32px; text-align:left; padding-bottom:20px;"><multiline>Lorem ipsum dolor sit amet consecteur</multiline></td>
																</tr> -->
																<tr>
																	<td class="text pb20" style="color:#777777; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;">
																		<multiline>	
                                                                            <p>Hi ${info.name}</p>
                                                                            <p>You recently requested to reset your password for your Gendytronics account.</p> 
                                                                            <p> Please click the button below to reset your password.</p>
                                                                            <p>If you did not request a password reset, please ignore this email</p>
                                                                            <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
                                                                            <p>Thanks,</p>
																		</multiline>
																	</td>
																</tr>
																<!-- Button -->
																<tr>
																	<td align="left">
																		<table border="0" cellspacing="0" cellpadding="0" style="margin-bottom:1rem">
																			<tr>
																				<td class="text-button" style="background:#ffeb3b; color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 20px; text-align:center; border-radius:6px;"><multiline><a href="${info.link}" target="_blank" class="link-white" style="color:#363636; text-decoration:none;"><span class="link-white" style="color:#363636; text-decoration:none;">Reset Password</span></a></multiline></td>
                                                                            </tr>
                                                                            
																		</table>
                                                                        
																	</td>
																</tr>
                                                                <tr>
                                                                    <td>
                                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="text-button" style="display: block; margin-bottom: 2rem; color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; text-align:left;">${info.link}</td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>
                                                                        <table>
                                                                            <tr>
                                                                                <td style="color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:10px;">NOTE: the link will expire within 24hrs</td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
																<!-- END Button -->
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</layout>	
								<!-- END Article / Title + Copy + Button -->

							<!-- Footer -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td class="p30-15" style="padding: 50px 30px;" bgcolor="#ffffff">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td align="center" style="padding-bottom: 30px;">
													<table border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="https://www.facebook.com/aljazriacademy/" target="_blank"><img src="https://i.ibb.co/JdNYZVR/t8-ico-facebook.jpg" width="38" height="38" editable="true" border="0" alt="" /></a></td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td class="text-footer1 pb10" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;"><multiline>Elgendy Autotronics Center</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;"><multiline>Al Haram, Al Omraneyah Ash Sharqeyah, El Omraniya, Giza Governorate 11511</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30"
													style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;">
													<a style="color:#999999;" href="https://www.gendyecu.com" target="__blank">visit website</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Footer -->
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>

`
},
support(info){
    return`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="format-detection" content="date=no" />
	<meta name="format-detection" content="address=no" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i" rel="stylesheet" />
    <!--<![endif]-->
	<title>Email Template</title>
	<!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->
	

	<style type="text/css" media="screen">
		/* Linked Styles */
		body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none }
		a { color:#66c7ff; text-decoration:none }
		p { padding:0 !important; margin:0 !important } 
		img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
		.mcnPreviewText { display: none !important; }
		.hero_bg {
			background-image: url('https://i.ibb.co/HCbMmHJ/img-3.png');
			margin:0;
			padding: 0;
		}
				
		/* Mobile styles */
		@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
			.mobile-shell { width: 100% !important; min-width: 100% !important; }
			.bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
			
			.text-header,
			.m-center { text-align: center !important; }
			
			.center { margin: 0 auto !important; }
			.container { padding: 20px 10px !important }
			
			.td { width: 100% !important; min-width: 100% !important; }

			.m-br-15 { height: 15px !important; }
			.p30-15 { padding: 30px 15px !important; }
			.p40 { padding: 20px !important; }

			.m-td,
			.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

			.m-block { display: block !important; }

			.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

			.column,
			.column-top,
			.column-empty,
			.column-empty2,
			.column-dir-top { float: left !important; width: 100% !important; display: block !important; }
			.column-empty { padding-bottom: 10px !important; }
			.column-empty2 { padding-bottom: 20px !important; }
			.content-spacing { width: 15px !important; }
		}
	</style>
</head>
<body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
		<tr>
			<td align="center" valign="top">
				<table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
					<tr>
						<td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
							<!-- Header -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td style="padding-bottom: 20px;">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td class="p30-15" style="padding: 25px 30px 25px 30px;" bgcolor="#ffffff">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														<tr>
															<th class="column-top" width="145" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;"><img src="https://i.ibb.co/gFfjfPy/gendy-logo.png" width="167" height="75" editable="true" border="0" alt="" /></td>
																	</tr>
																</table>
															</th>
															<th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
															<th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td class="text-header" style="color:#000; font-family:'Noto Sans', Arial,sans-serif; font-size:20px; line-height:16px; text-align:right; text-transform:uppercase;"><multiline><webversion class="link2" style="color:#000; font-weight: 900; text-decoration:none;">SUPPORT</webversion></multiline></td>
																	</tr>
																</table>
															</th>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Header -->

							<repeater>
								<!-- Article / Title + Copy + Button -->
								<layout label='Article / Title + Copy + Button'>
									<table width="100%" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td style="padding-bottom: 20px;">
												<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
													<tr>
														<td class="p30-15" style="padding: 50px 30px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<!-- <tr>
																	<td class="h3 pb20" style="color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:24px; line-height:32px; text-align:left; padding-bottom:20px;"><multiline></multiline></td>
																</tr> -->
																<tr>
																	<td class="text pb20" style="color:#777777; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;">
																		<multiline>	
                                                                           ${ info.name ? `<p>Hi ${info.name}</p>` : '' }
                                                                            ${info.html}
																		</multiline>
																	</td>
																</tr>
																<!-- Button -->
																<!-- <tr>
																	<td align="left">
																		<table border="0" cellspacing="0" cellpadding="0" style="margin-bottom:1rem">
																			<tr>
																				<td class="text-button" style="background:#ffeb3b; color:#363636; font-family:'Noto Sans', Arial,sans-serif; font-size:14px; line-height:18px; padding:12px 20px; text-align:center; border-radius:6px;"><multiline><a href="#" target="_blank" class="link-white" style="color:#363636; text-decoration:none;"><span class="link-white" style="color:#363636; text-decoration:none;">Reset Password</span></a></multiline></td>
                                                                            </tr>
                                                                            
																		</table>
                                                                        
																	</td>
																</tr> -->
                                                                
																<!-- END Button -->
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</layout>	
								<!-- END Article / Title + Copy + Button -->

							<!-- Footer -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td class="p30-15" style="padding: 50px 30px;" bgcolor="#ffffff">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td align="center" style="padding-bottom: 30px;">
													<table border="0" cellspacing="0" cellpadding="0">
														<tr>
															<td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;"><a href="https://www.facebook.com/aljazriacademy/" target="_blank"><img src="https://i.ibb.co/JdNYZVR/t8-ico-facebook.jpg" width="38" height="38" editable="true" border="0" alt="" /></a></td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td class="text-footer1 pb10" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;"><multiline>Elgendy Autotronics Center</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30" style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;"><multiline>Al Haram, Al Omraneyah Ash Sharqeyah, El Omraniya, Giza Governorate 11511</multiline></td>
											</tr>
											<tr>
												<td class="text-footer2 pb30"
													style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;">
													<a style="color:#999999;" href="https://www.gendyecu.com" target="__blank">visit website</a>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- END Footer -->
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>

    `
},
// totalPrice - orderId - items [name, price, quantity]
receipt(info) {
    return `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i" rel="stylesheet" />
    <!--<![endif]-->
    <title>Email Template</title>
    <!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->


    <style type="text/css" media="screen">
        /* Linked Styles */
        body {
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
            min-width: 100% !important;
            width: 100% !important;
            background: #f4f4f4;
            -webkit-text-size-adjust: none;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: none;
            width: 100% !important;
            height: 100%;
            line-height: 1.6em;
        }

        a {
            color: #66c7ff;
            text-decoration: none
        }

        p {
            padding: 0 !important;
            margin: 0 !important
        }

        img {
            -ms-interpolation-mode: bicubic;
            /* Allow smoother rendering of resized image in Internet Explorer */
        }

        .mcnPreviewText {
            display: none !important;
        }

        .hero_bg {
            background-image: url('https://i.ibb.co/HCbMmHJ/img-3.png');
            margin: 0;
            padding: 0;
        }
        

        @media only screen and (max-width: 640px) {
            body {
                padding: 0 !important;
            }

            h1 {
                font-weight: 800 !important;
                margin: 20px 0 5px !important;
            }

            h2 {
                font-weight: 800 !important;
                margin: 20px 0 5px !important;
            }

            h3 {
                font-weight: 800 !important;
                margin: 20px 0 5px !important;
            }

            h4 {
                font-weight: 800 !important;
                margin: 20px 0 5px !important;
            }

            h1 {
                font-size: 22px !important;
            }

            h2 {
                font-size: 18px !important;
            }

            h3 {
                font-size: 16px !important;
            }

            .container {
                padding: 0 !important;
                width: 100% !important;
            }

            .content {
                padding: 0 !important;
            }

            .content-wrap {
                padding: 10px !important;
            }

            .invoice {
                width: 100% !important;
            }
        }


        /* Mobile styles */
        @media only screen and (max-device-width: 480px),
        only screen and (max-width: 480px) {
            .mobile-shell {
                width: 100% !important;
                min-width: 100% !important;
            }

            .bg {
                background-size: 100% auto !important;
                -webkit-background-size: 100% auto !important;
            }

            .text-header,
            .m-center {
                text-align: center !important;
            }

            .center {
                margin: 0 auto !important;
            }

            .container {
                padding: 20px 10px !important
            }

            .td {
                width: 100% !important;
                min-width: 100% !important;
            }

            .m-br-15 {
                height: 15px !important;
            }

            .p30-15 {
                padding: 30px 15px !important;
            }

            .p40 {
                padding: 20px !important;
            }

            .m-td,
            .m-hide {
                display: none !important;
                width: 0 !important;
                height: 0 !important;
                font-size: 0 !important;
                line-height: 0 !important;
                min-height: 0 !important;
            }

            .m-block {
                display: block !important;
            }

            .fluid-img img {
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
            }

            .column,
            .column-top,
            .column-empty,
            .column-empty2,
            .column-dir-top {
                float: left !important;
                width: 100% !important;
                display: block !important;
            }

            .column-empty {
                padding-bottom: 10px !important;
            }

            .column-empty2 {
                padding-bottom: 20px !important;
            }

            .content-spacing {
                width: 15px !important;
            }
        }
    </style>
</head>

<body class="body"
    style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4f4f4; -webkit-text-size-adjust:none;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
        <tr>
            <td align="center" valign="top">
                <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                    <tr>
                        <td class="td container"
                            style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
                            <!-- Header -->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td class="p30-15" style="padding: 25px 30px 25px 30px;"
                                                    bgcolor="#ffffff">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <th class="column-top" width="145"
                                                                style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                                <table width="100%" border="0" cellspacing="0"
                                                                    cellpadding="0">
                                                                    <tr>
                                                                        <td class="img m-center"
                                                                            style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                            <img src="https://i.ibb.co/gFfjfPy/gendy-logo.png" width="167"
                                                                                height="75" editable="true" border="0"
                                                                                alt="" /></td>
                                                                    </tr>
                                                                </table>
                                                            </th>
                                                            <th class="column-empty" width="1"
                                                                style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                            </th>
                                                            <th class="column"
                                                                style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                <table width="100%" border="0" cellspacing="0"
                                                                    cellpadding="0">
                                                                    <tr>
                                                                        <td class="text-header"
                                                                            style="color:#000; font-family:'Noto Sans', Arial,sans-serif; font-size:20px; line-height:16px; text-align:right; text-transform:uppercase;">
                                                                            <multiline>
                                                                                <webversion class="link2"
                                                                                    style="color:#000; font-weight: 900; text-decoration:none;">
                                                                                    ORDER RECEIPT</webversion>
                                                                            </multiline>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </th>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!-- END Header -->

                            <repeater>
                                <!-- Article / Title + Copy + Button -->
                                <layout label='Article / Title + Copy + Button'>
                                    <table class="body-wrap"
                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;"
                                        bgcolor="#f6f6f6">
                                        <tr
                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                            <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;"
                                                valign="top"></td>
                                            <td class="container" width="600"
                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;"
                                                valign="top">
                                                <div class="content"
                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                                                    <table class="main" width="100%" cellpadding="0" cellspacing="0"
                                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;"
                                                        bgcolor="#fff">
                                                        <tr
                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                            <td class="content-wrap aligncenter"
                                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 20px;"
                                                                align="center" valign="top">
                                                                <table width="100%" cellpadding="0" cellspacing="0"
                                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                    <tr
                                                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                        <td class="content-block"
                                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;"
                                                                            valign="top">
                                                                            <h1 class="aligncenter"
                                                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 32px; color: #000; line-height: 1.2em; font-weight: 500; text-align: center; margin: 40px 0 0;"
                                                                                align="center">$${info.totalPrice} Paid</h1>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                        <td class="content-block"
                                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;"
                                                                            valign="top">
                                                                            <h2 class="aligncenter"
                                                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif; box-sizing: border-box; font-size: 24px; color: #000; line-height: 1.2em; font-weight: 400; text-align: center; margin: 40px 0 0;"
                                                                                align="center">Thanks for using El Gendy
                                                                                Autotronices Center</h2>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                        <td class="content-block aligncenter"
                                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: center; margin: 0; padding: 0 0 20px;"
                                                                            align="center" valign="top">
                                                                            <table class="invoice"
                                                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; text-align: left; width: 80%; margin: 40px auto;">
                                                                                <tr
                                                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                                    <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 15px 0;"
                                                                                        valign="top">ORDER NO: ${info.orderId}</td>
                                                                                    </td> 
                                                                                </tr>
                                                                                <tr
                                                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                                    <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 10px 0;"
                                                                                        valign="top">
                                                                                        <table class="invoice-items"
                                                                                            cellpadding="0"
                                                                                            cellspacing="0"
                                                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; margin: 0;">
                                                                                            
                                                                                            ${
                                                                                                info.items.map(item => (
                                                                                                    `<tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 1rem 0;">
                                                                                                        <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; padding: 15px 0;"
                                                                                                            valign="top">${item.name}
                                                                                                        </td>
                                                                                                        <td class="alignright"
                                                                                                            style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; margin: 0; padding: 15px 0;"
                                                                                                            align="right"
                                                                                                            valign="top">$ ${item.price}
                                                                                                        </td>
                                                                                                    </tr>`
                                                                                                ))
                                                                                            }
                                                                                            
                                                                                            

                                                                                            <tr class="total"
                                                                                                style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                                                                <td class="alignright"
                                                                                                    width="80%"
                                                                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 2px; border-top-color: #333; border-top-style: solid; border-bottom-color: #333; border-bottom-width: 2px; border-bottom-style: solid; font-weight: 700; margin: 0; padding: 10px 0;"
                                                                                                    align="right"
                                                                                                    valign="top">Total
                                                                                                </td>
                                                                                                <td class="alignright"
                                                                                                    style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; text-align: right; border-top-width: 2px; border-top-color: #333; border-top-style: solid; border-bottom-color: #333; border-bottom-width: 2px; border-bottom-style: solid; font-weight: 700; margin: 0; padding: 10px 0;"
                                                                                                    align="right"
                                                                                                    valign="top">$ ${info.totalPrice}
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </td>
                                            <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;"
                                                valign="top"></td>
                                        </tr>
                                    </table>
                                </layout>
                                <!-- END Article / Title + Copy + Button -->

                                <!-- Footer -->
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td class="p30-15" style="padding: 50px 30px;" bgcolor="#ffffff">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="padding-bottom: 30px;">
                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td class="img" width="55"
                                                                    style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                    <a href="https://www.facebook.com/aljazriacademy/"
                                                                        target="_blank"><img
                                                                            src="https://i.ibb.co/JdNYZVR/t8-ico-facebook.jpg" width="38"
                                                                            height="38" editable="true" border="0"
                                                                            alt="" /></a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-footer1 pb10"
                                                        style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;">
                                                        <multiline>Elgendy Autotronics Center</multiline>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-footer2 pb30"
                                                        style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;">
                                                        <multiline>Al Haram, Al Omraneyah Ash Sharqeyah, El Omraniya,
                                                            Giza Governorate 11511</multiline>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text-footer2 pb30"
                                                        style="color:#999999; font-family:'Noto Sans', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;">
                                                        <a style="color:#999999;" href="https://www.gendyecu.com" target="__blank">visit website</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <!-- END Footer -->
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
    `
}
}

export default template