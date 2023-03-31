
## Welcome to the

![codeforge_logo.png](codeforge_logo.png)

---

## Team codeforge

- Sebastian Bodo Hennicke
- Sebastian Tamayo Pacheco
- Bacdasch Zafaryar
- Christian Lange

---

## what did we do?

#### Single- and multiplayer 
#### textadventure webapplication

---
## Filterchain
```html
 @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors (Customizer.withDefaults ())
                .csrf ()
                .disable ()
                .authorizeHttpRequests ()
                .requestMatchers (
                        "/",
                        "/api/v1/auth/**",
                        "/api/games/**",
                        "/api/categories/**",
                        "/api/chapters/**",
                        "/api/images/**"

                )
                .permitAll ()
                .requestMatchers (
                        "/api/comment",
                         "/api/users/**",
                        "/api/review",
                        "/api/review/**",
                        "/profil/**",
                        "/api/updateInfo/{username}",
                        "/api/updateInfo/{username}**",
                        "/api/comment/update/{commentId}",
                        "/api/comment/update/{commentId}**",
                        "/api/review/update/{reviewId}",
                        "/api/review/update/{reviewId}**")
                .hasAnyAuthority (Role.USER.name (),Role.ADMIN.name ())
                .requestMatchers (
                        "/api/users/{username}/listOfUsers/**",
                        "/api/users/{username}/listOfUsers",
                        "/api/games/delete/**",
                        "/api/upgrade/{username}",
                        "/api/downgrade/{username}")
                .hasAuthority (Role.ADMIN.name ())
                .anyRequest ()
                .authenticated ()
                .and ()
                .sessionManagement ()
                .sessionCreationPolicy (SessionCreationPolicy.STATELESS)
                .and ()
                .authenticationProvider (authenticationProvider)
                .addFilterBefore (jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout ()
                .logoutUrl ("/api/v1/auth/logout")
                .addLogoutHandler (logoutHandler)
                .logoutSuccessHandler (
                        (request, response, authentication) ->
                        SecurityContextHolder.clearContext ()
                )
                ;

        return http.build ();
    }

```
---
## Gesicherte Endpoints!

<a> http://localhost:8080/api/review </a>

---

## our shared learnings

- new technical functions like multiplayer
- reading and merging of different codes
- how to use devtools
- how to handle version file management like Git


---
### We hope you enjoyed our game 🕹️ !


### now it's time for your questions

![img_2.png](img_2.png)

