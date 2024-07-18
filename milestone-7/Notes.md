# Why do we need ESO?

1. K8s will only encode secret. This does not mean it is secure. It needs to be "encrypted". The encoded secret can be easily decoded.

2. Managing secrets across clusters. Managing and rotations become cumbersome. Some way to sync.

3. Keys are already being stored in Secret Managers like Vault, AWS SM, GSM, AKV
   Need some way to sync these secrets and enable pods and containers to use them.

4.
