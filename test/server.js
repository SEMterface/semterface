v a r   a s s e r t   =   r e q u i r e ( ' a s s e r t ' ) ; 
 v a r   r e q u e s t   =   r e q u i r e ( ' r e q u e s t ' ) ; 
 v a r   h t t p U t i l s   =   r e q u i r e ( ' r e q u e s t - m o c h a ' ) ( r e q u e s t ) ; 
 
 v a r   s e r v e r   =   r e q u i r e ( ' . . / l i b / s e r v e r ' ) 
 
 d e s c r i b e ( ' S t a r t   t h e   s e r v e r ' ,   f u n c t i o n ( )   { 
     b e f o r e ( s e r v e r . s t a r t ) ; 
     t h i s . t i m e o u t ( 1 0 0 0 0 ) ; 
 
     d e s c r i b e ( ' G E T   / ' ,   f u n c t i o n ( )   { 
         h t t p U t i l s . s a v e ( ' h t t p : / / l o c a l h o s t : 3 0 0 0 / ' ) ; 
 
         i t   ( ' s h o u l d   r e s p o n d   w i t h o u t   e r r o r ' ,   f u n c t i o n ( )   { 
             a s s e r t ( t h i s . e r r   = = =   n u l l ) 
         } ) ; 
 
         i t   ( ' s h o u l d   r e s p o n d   w i t h   2 0 2   s t a t u s   c o d e ' ,   f u n c t i o n ( )   { 
             a s s e r t ( t h i s . r e s . s t a t u s C o d e   = = =   2 0 0 ) ; 
         } ) ; 
 
         i t   ( ' s h o u l d   r e s p o n d   w i t h   " W e l c o m e   t o   E x p r e s s " ' ,   f u n c t i o n ( ) { 
             v a r   p o s   =   t h i s . b o d y . i n d e x O f ( " W e l c o m e   t o   E x p r e s s " ) 
             a s s e r t ( p o s   >   - 1   ) 
         } ) 
     } ) ; 
 
     a f t e r ( s e r v e r . s t o p ) ; 
 } ) ; 
 